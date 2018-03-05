import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  id: string;
  character: Observable<any>;

  constructor(
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
      .valueChanges()
      .flatMap(result => result);
  }

}
