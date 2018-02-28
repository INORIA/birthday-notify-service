import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  preview: string;
  fileToUpload: File;

  constructor() { }

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
  }

}
