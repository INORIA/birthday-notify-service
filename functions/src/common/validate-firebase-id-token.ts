import * as express from 'express';
import * as admin from 'firebase-admin';

export const validateFirebaseIdToken = async (req: express.Request, res: express.Response, next) => {
  if (!req.headers.authorization || !(req.headers.authorization as string).startsWith('Bearer ')) {
    res.status(403).send('Unauthorized');
    return;
  }

  const idToken = (req.headers.authorization as string).split('Bearer ')[1];

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req['user'] = decodedIdToken;
    return next();
  } catch (e) {
     res.status(403).send('Unauthorized');
  }
};
