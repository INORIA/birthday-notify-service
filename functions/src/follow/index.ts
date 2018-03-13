import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { bindApp } from '../common/bind-app';
import { validateFirebaseIdToken } from '../common/validate-firebase-id-token';

const app = express();
const corsConfig = cors({origin: 'http://localhost:4200'});

app.use(bodyParser.urlencoded({extended: false}));
app.use(corsConfig);
app.use(validateFirebaseIdToken);

app.post('*', async (req: express.Request, res: express.Response) => {
  const userId = req['user'].uid;
  const characterId = req.body.characterId;

  try {
    await admin
      .firestore()
      .collection('character_followers')
      .doc(characterId)
      .set({ [userId]: true }, { merge: true });

    await admin
      .firestore()
      .collection('user_follows')
      .doc(userId)
      .set({ [characterId]: true }, { merge: true });

    return res.json({});
  } catch(e) {
    return res.status(500).json({});
  }
});

export const followCharacterFunc = bindApp(app);
