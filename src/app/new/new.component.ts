import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { finalize, map } from 'rxjs/operators';
import { Observable } from 'rxjs-compat/Observable';
import { UploadTaskSnapshot } from '@firebase/storage-types';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { DocumentReference } from '@firebase/firestore-types';
import { AngularFireAuth } from 'angularfire2/auth';

import { ICharacter, Character } from '../models/character';
import { IWork } from '../models/work';
import { FormStates } from '../enums/form-states';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  FormStates = FormStates;
  uploadPercent = 0;
  imageUploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  formState = FormStates.WaitForSubmit;
  works: Observable<IWork[]>;

  // input field values
  model = new Character();
  fileToUpload: File;

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {
    const worksCollection = afs.collection<IWork>('works');
    this.works = worksCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as IWork;
          const id = a.payload.doc.id;
          return { /*id,*/ ...data };
        });
      })
    );
  }

  ngOnInit() {}

  handleFileInput(files: FileList): void {
    if (files.length === 0) {
      this.model.image = '';
      return;
    }
    const fileItem = files.item(0);
    this.fileToUpload = fileItem;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      // this.model.image = reader.result;
    });
    reader.readAsDataURL(this.fileToUpload);
  }

  async onSubmit(e) {
    e.preventDefault();

    // disable the submit button
    this.formState = FormStates.Submitting;

    try {
      const user = this.afAuth.auth.currentUser;
      const ref = await this.postData({
        id: this.model.id,
        name: this.model.name,
        ruby: this.model.ruby,
        birthday_month: this.model.birthday_month,
        birthday_date: this.model.birthday_date,
        work: firebase.firestore().doc(`/works/${this.model.work}`),
        accountId: user.uid
      });

      const doc = await ref.get();
      const id = doc.id;
      this.uploadPercent = 20;

      const downloadURL = await this.uploadFile(id);

      await ref.update({
        image: downloadURL
      });

      this.uploadPercent = 100;
      this.formState = FormStates.Submitted;

      setTimeout(() => {
        this.router.navigate(['', this.model.id], {
          queryParams: { new: true }
        });
      }, 600);
    } catch (e) {
      this.message(`${this.model.name} を作成できませんでした。`);
      console.log(e.message);
    }
  }

  private uploadFile(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const filePath = `characters/${id}/${this.fileToUpload.name}`;
      const task = this.storage.upload(filePath, this.fileToUpload);
      const fileRef = this.storage.ref(filePath);

      this.imageUploadPercent = task.percentageChanges();
      task.percentageChanges().subscribe(c => {
        // Upload section starts from 20% and ends around 90%
        this.uploadPercent = (c / (100 + 42)) * 100 + 0.2;
      });
      task
        .snapshotChanges()
        .pipe(finalize(() => (this.downloadURL = fileRef.getDownloadURL())));
    });
  }

  private postData(data: ICharacter): Promise<DocumentReference> {
    return this.afs.collection<ICharacter>('characters').add(data);
  }

  private message(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 2000;
    this.snackBar.open(message, '', config);
  }
}
