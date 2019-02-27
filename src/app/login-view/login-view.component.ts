import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { MatSnackBar } from '@angular/material';
import { MatDialogRef } from '@angular/material';

import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    public afAuth: AngularFireAuth,
    private dialogRef: MatDialogRef<HeaderComponent>
  ) {}

  ngOnInit() {}

  loginWithGoogle(event) {
    event.preventDefault();

    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        this.dialogRef.close();
        this.displayMessage();
      })
      .catch(e => {
        this.displayError();
      });
  }

  loginWithTwitter(event) {
    event.preventDefault();

    this.afAuth.auth
      .signInWithPopup(new firebase.auth.TwitterAuthProvider())
      .then(() => {
        this.dialogRef.close();
        this.displayMessage();
      })
      .catch(e => {
        this.displayError();
      });
  }

  private displayError(message = 'ログインできませんでした') {
    this.snackBar.open(message, '', {
      duration: 2000
    });
  }

  private displayMessage(message = 'ログインしました') {
    this.snackBar.open(message, '', {
      duration: 2000
    });
  }
}
