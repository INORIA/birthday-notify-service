import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';

export enum Functions {
  followCharacter = 'https://us-central1-angularfire-db7be.cloudfunctions.net/followCharacter',
  sendEmail = 'https://us-central1-angularfire-db7be.cloudfunctions.net/sendEmail'
}

@Injectable()
export class CloudFunctionsService {
  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {}

  private async requestIdToken() {
    return await this.afAuth.auth.currentUser.getIdToken(true);
  }

  public async call(url: Functions, options = {}) {
    try {
      const idToken = await this.requestIdToken();
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${idToken}`
        })
      };
      await this.http.post(url, options, httpOptions).toPromise();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
