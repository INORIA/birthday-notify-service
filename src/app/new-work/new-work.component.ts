import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { DocumentReference } from "@firebase/firestore-types";
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { IWork, Work } from '../models/work';
import { FormStates } from '../enums/form-states';


@Component({
  selector: 'app-new-work',
  templateUrl: './new-work.component.html',
  styleUrls: ['./new-work.component.scss']
})
export class NewWorkComponent implements OnInit {

  FormStates = FormStates;
  formState = FormStates.WaitForSubmit;
  model = new Work();
  submitPercent: number = 0;

  constructor(
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {

  }

  async onSubmit(e) {
    this.formState = FormStates.Submitting;

    try {
      const user = this.afAuth.auth.currentUser;
      await this.postData({
        category: this.model.category,
        name: this.model.name
      });
      this.submitPercent = 100;
      this.formState = FormStates.Submitted;

      setTimeout(() => {
        location.reload();
      }, 600);
    } catch (e) {
      this.message(`${this.model.name} を作成できませんでした。`);
      console.log(e.message);
    }
  }

  private postData(data: IWork): Promise<DocumentReference> {
    return this.afs.collection<IWork>('works').add(data);
  }

  private message(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    this.snackBar.open(message, '', config);
  }

}
