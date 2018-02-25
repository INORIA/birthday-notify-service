import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  characters: Observable<any[]>;

  constructor(db: AngularFirestore, public afAuth: AngularFireAuth) {
    this.characters = db.collection('characters').valueChanges();
   }

  ngOnInit() {
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
