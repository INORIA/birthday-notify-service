import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { UploadTaskSnapshot } from '@firebase/storage-types';

import { ICharacter } from '../models/character';
import { DocumentReference } from '@firebase/firestore-types';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  preview: string;

  // input field values
  id: string;
  name: string;
  ruby: string;
  month: number;
  date: number;
  fileToUpload: File;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage, private afs: AngularFirestore) { }

  ngOnInit() {
  }

  handleIdInput(id: string) {
    this.id = id;
  }

  handleNameInput(name: string) {
    this.name = name;
  }

  handleRubyInput(ruby: string) {
    this.ruby = ruby;
  }

  handleMonthInput(month: number) {
    this.month = month;
  }

  handleDateInput(date: number) {
    this.date = date;
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

    try {
      const downloadURL = await this.uploadFile();

      const ref = await this.postData({
        id: this.id,
        name: this.name,
        ruby: this.ruby,
        birthday_month: this.month,
        birthday_date: this.date,
        image: downloadURL,
      });

      console.log(ref);
    } catch (e) {
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
}
