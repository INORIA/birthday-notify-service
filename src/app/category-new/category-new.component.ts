import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { DocumentReference } from '@firebase/firestore-types';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';

import { ICategory, Category } from '../models/category';
import { FormStates } from '../enums/form-states';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.scss']
})
export class CategoryNewComponent implements OnInit {
  FormStates = FormStates;
  formState = FormStates.WaitForSubmit;
  model = new Category();
  submitPercent = 0;

  constructor(
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {}

  async onSubmit(e) {
    e.preventDefault();
    this.formState = FormStates.Submitting;

    try {
      const user = this.afAuth.auth.currentUser;
      await this.postData({
        name: this.model.name
      });
      this.submitPercent = 100;
      this.formState = FormStates.Submitted;

      setTimeout(() => {
        location.reload();
      }, 600);
    } catch (e) {
      this.formState = FormStates.Failed;
      this.message(`${this.model.name} を作成できませんでした。`);
      console.log(e.message);
    }
  }

  private postData(data: ICategory): Promise<DocumentReference> {
    return this.afs.collection<ICategory>('categories').add(data);
  }

  private message(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    this.snackBar.open(message, '', config);
  }
}
