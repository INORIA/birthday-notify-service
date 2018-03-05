import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  loginWithGoogle(event) {
    event.preventDefault();

    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
    });
  }

  loginWithTwitter(event) {
    event.preventDefault();

    this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider()).then(() => {
    });
  }
}
