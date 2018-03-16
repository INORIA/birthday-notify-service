import * as nodemailer from 'nodemailer';
import * as functions from 'firebase-functions';
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
  const transporter = nodemailer.createTransport({
    port: functions.config().smtp.port,
    host: functions.config().smtp.host,
    auth: {
      user: functions.config().smtp.auth.user,
      pass: functions.config().smtp.auth.pass
    }
  });

  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our message');
    }
  });

  const message = {
    from: functions.config().mail.from,
    to: functions.config().sample.mail.to,
    subject: 'Subject',
    text: 'Plain text version of the message',
    html: '<p>HTML Version of the message</p>'
  };
  transporter.sendMail(message).then((e) => {
    console.log(e);
  }).catch((e) => {
    console.log(e);
  });

  return res.status(200).json({});
});

export const sendEmailFunc = bindApp(app);
