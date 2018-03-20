import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private characterCollection: AngularFirestoreCollection<any>;
  characters: Observable<any[]>;
  birthThisMonth: Observable<any[]>;

  constructor(private db: AngularFirestore, public afAuth: AngularFireAuth) {
    this.characterCollection = db.collection('characters');
    this.characters = this.characterCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const _id = a.payload.doc.id;
        return { _id, ...data };
      });
    });;

    const thisMonth = '' + (new Date().getMonth() + 1);
    this.birthThisMonth = this.db.collection('characters', ref => ref.where('birthday_month', '==', thisMonth))
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const _id = a.payload.doc.id;
          return { _id, ...data };
        });
      });
   }

  ngOnInit() {
  }

  log(val) {
    console.log(val);
  }

}
