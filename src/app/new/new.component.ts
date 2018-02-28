import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { UploadTaskSnapshot } from '@firebase/storage-types';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  preview: string;
  fileToUpload: File;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage) { }

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

  onSubmit(e) {
    e.preventDefault();

    const task = this.storage.upload(`characters/${this.fileToUpload.name}`, this.fileToUpload);
    task.snapshotChanges()
      .subscribe(
        (e: UploadTaskSnapshot) => {},
        (error: Error) => {
          alert('Error occurred while uploading the image. \n' + error.message);
        },
        () => {
          console.log('Completed');
        }
      );
    this.uploadPercent = task.percentageChanges();
    this.downloadURL = task.downloadURL();
  }

}
