import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  items: Observable<any[]>;
  characters: Observable<any[]>;

  constructor(db: AngularFirestore, public afAuth: AngularFireAuth) {
    this.items = db.collection('items').valueChanges();
    this.characters = db.collection('characters').valueChanges();
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {
      console.log(result);
      firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        // Send token to your backend via HTTPS
        // ...
        console.log(idToken);
      }).catch(function(error) {
        // Handle error
      });
    });

  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
