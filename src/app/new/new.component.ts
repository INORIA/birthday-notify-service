import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { UploadTaskSnapshot } from '@firebase/storage-types';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';

import { ICharacter, Character } from '../models/character';
import { DocumentReference } from '@firebase/firestore-types';
import { FormStates } from '../enums/form-states';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  FormStates = FormStates;
  preview: string;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  formState = FormStates.WaitForSubmit;

  // input field values
  model = new Character();
  fileToUpload: File;

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    const fileItem = files.item(0);
    this.fileToUpload = fileItem;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.preview = reader.result;
    });
    reader.readAsDataURL(this.fileToUpload);
  }

  async onSubmit(e) {
    e.preventDefault();

    // disable the submit button
    this.formState = FormStates.Submitting;

    try {
      const downloadURL = await this.uploadFile();

      const ref = await this.postData({
        id: this.model.id,
        name: this.model.name,
        ruby: this.model.ruby,
        birthday_month: this.model.birthday_month,
        birthday_date: this.model.birthday_date,
        image: downloadURL,
      });

      this.formState = FormStates.Submitted;
      this.router.navigate(['', this.model.id]);
    } catch (e) {
      this.message(`${this.model.name} を作成できませんでした。`);
      console.log(e.message);
    }
  }

  private uploadFile(): Promise<string> {
    return new Promise((resolve, reject) => {
      const task = this.storage.upload(`characters/${this.fileToUpload.name}`, this.fileToUpload);
      task.downloadURL().subscribe((e) => {
        resolve(e);
      }, (error: Error) => {
        reject(error);
      });
      this.uploadPercent = task.percentageChanges();
      this.downloadURL = task.downloadURL();
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
