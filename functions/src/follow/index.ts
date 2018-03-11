import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import { bindApp } from '../common/bind-app';
import { validateFirebaseIdToken } from '../common/validate-firebase-id-token';

const app = express();

app.use(validateFirebaseIdToken);

app.post('*', async (req: express.Request, res: express.Response) => {
  return res.send("Hello from Firebase!" + req['user']);

  // return admin.firestore().collection('character_follows').add({
  //   name: 'ooeijawfoiej'
  // }).then((ref) => {
  //   res.send("Hello from Firebase!" + ref.id);
  // });
});

export const followCharacterFunc = bindApp(app);
