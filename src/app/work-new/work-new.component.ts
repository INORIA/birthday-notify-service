import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { DocumentReference } from '@firebase/firestore-types';
import { AngularFireStorage } from 'angularfire2/storage';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs-compat/Observable';
import * as firebase from 'firebase';

import { IWork, Work } from '../models/work';
import { FormStates } from '../enums/form-states';
import { ICategory } from '../models/category';

@Component({
  selector: 'app-new-work',
  templateUrl: './work-new.component.html',
  styleUrls: ['./work-new.component.scss']
})
export class WorkNewComponent implements OnInit {
  FormStates = FormStates;
  formState = FormStates.WaitForSubmit;
  model = new Work();
  submitPercent = 0;
  categories: Observable<ICategory[]>;

  constructor(
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
    private afAuth: AngularFireAuth
  ) {
    const categoriesCollection = afs.collection<ICategory>('categories');
    this.categories = categoriesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as ICategory;
          const id = a.payload.doc.id;
          return { /*id, */ ...data };
        });
      })
    );
  }

  ngOnInit() {}

  async onSubmit(e) {
    e.preventDefault();
    this.formState = FormStates.Submitting;

    try {
      const user = this.afAuth.auth.currentUser;
      await this.postData({
        categories: [
          firebase.firestore().doc(`/categories/${this.model.category}`)
        ],
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

  private postData(data: any): Promise<DocumentReference> {
    return this.afs.collection<IWork>('works').add(data);
  }

  private message(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    this.snackBar.open(message, '', config);
  }
}
