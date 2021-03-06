import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { followCharacterFunc } from './follow';
import { sendEmailFunc } from './send-mail';
import { cronTwitterTodayBirthdayFunc } from './cron-twitter-today-birthday';

admin.initializeApp(functions.config().firebase);

export const followCharacter = followCharacterFunc;
export const sendEmail = sendEmailFunc;
export const cronTwitterTodayBirthday = cronTwitterTodayBirthdayFunc;
