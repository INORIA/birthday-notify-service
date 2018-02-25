import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  id: string;
  character: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.character = this.afs
      .collection(
        'characters',
         ref => ref.where('id', '==', this.id)
         .limit(1)
      )
      .valueChanges()
      .flatMap(result => result);
  }

}
