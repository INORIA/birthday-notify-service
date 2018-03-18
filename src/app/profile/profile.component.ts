import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { zip } from 'rxjs/observable/zip';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { ICharacter } from '../models/character';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  followingCharacters$: Observable<ICharacter[]>;

  constructor(
    private db: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      const followingCollection = this.db.collection('user_follows').doc(user.uid);

      followingCollection.valueChanges().subscribe(all => {
        const followings = Object.keys(all).reduce((a, c) => {
          if (all[c]) { return [c, ...a] }
          return a;
        }, []);

        const characterObservables = followings.map(id => this.db.collection('characters').doc(id).snapshotChanges().map(a => {
          const data = a.payload.data();
          const _id = a.payload.id;
          return { _id, ...data } as ICharacter;
        }));
        this.followingCharacters$ = zip(...characterObservables);
      });
    });
  }

}
