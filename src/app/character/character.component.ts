import { Observable } from 'rxjs/Observable';
import { zip } from 'rxjs/observable/zip';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/mergeMap';

import { CloudFunctionsService, Functions } from '../services/cloud-functions.service';
import { IWork } from '../models/work';
import { ICharacter } from '../models/character';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  id: string;
  character: Observable<any>;
  work: Observable<IWork>;
  following: boolean;

  constructor(
    private cloudFunction: CloudFunctionsService,
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    const isNew = this.route.snapshot.queryParamMap.get('new');
    if (isNew) {
      // remove get parameter if it has
      this.router.navigate(['/', this.id], {
        queryParams: {},
        replaceUrl: true
      });

      this.snackBar.open('新規追加しました', '', {
        duration: 2000
      });
    }

    this.character = this.afs
      .collection(
        'characters',
         ref => ref.where('id', '==', this.id)
         .limit(1)
      )
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const _id = a.payload.doc.id;
          return { _id, ...data };
        })[0];
      });
      // .valueChanges()
      // .flatMap(result => result);

    this.character.subscribe((character: ICharacter) => {
      if (character.work) {
        this.work = this.afs.doc<IWork>(`works/${character.work.id}`).valueChanges();
      }
    });

    zip(this.character, this.afAuth.authState).subscribe(([ { _id: characterId }, { uid } ]) => {
      this.afs.doc(`user_follows/${uid}`).valueChanges().subscribe((userFollows) => {
        console.log(uid);
        console.log();
        this.following = userFollows[characterId] === true;
      });
    });
  }

  follow(characterId) {
    this.cloudFunction.call(Functions.followCharacter, {characterId});
  }

  log(data) {
    console.log(data);
  }

}
