import * as functions from 'firebase-functions';

export const bindApp = app => functions.https.onRequest((req, res) => {
  if (!req.path) {
    req.url = `/${req.url}`;
  }
  return app(req, res);
});
