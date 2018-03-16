import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  email: string;
  uid: string;
  displayName: string;

  constructor(
    public afAuth: AngularFireAuth
  ) { }

  async ngOnInit() {

    this.afAuth.authState.subscribe(() => {
      const user = this.afAuth.auth.currentUser;
      this.email = user.email;
      this.uid = user.uid;
      this.displayName = user.displayName;
    });
  }

  async updateEmail() {
    const user = this.afAuth.auth.currentUser;
    if (!user) { return; }
    await user.updateEmail(this.email);
  }

}
