import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { MatDialog } from '@angular/material';

import { LoginViewComponent } from '../login-view/login-view.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private dialog: MatDialog) { }

  ngOnInit() {
  }

  login(event) {
    event.preventDefault();

    this.dialog.open(LoginViewComponent);

    // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
    //   firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    //     // Send token to your backend via HTTPS
    //   }).catch(function(error) {
    //     // Handle error
    //   });
    // });
  }

  logout(event) {
    event.preventDefault();
    this.afAuth.auth.signOut();
  }

}
