import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  canActivate() {
    return this.afAuth.authState.pipe(
      map(e => {
        if (!e) {
          this.router.navigate(['']);
          return false;
        }

        return true;
      })
    );
  }
}
