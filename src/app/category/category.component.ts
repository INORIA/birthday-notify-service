import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Observable } from 'rxjs-compat/Observable';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories$: Observable<any>;

  constructor(private afs: AngularFirestore) {
    this.categories$ = this.afs.collection('categories').valueChanges();
  }

  ngOnInit() {}
}
