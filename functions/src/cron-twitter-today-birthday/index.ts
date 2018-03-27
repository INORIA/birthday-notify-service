import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const cronTwitterTodayBirthdayFunc = functions.pubsub.topic('hourly-tick').onPublish(async event => {
  const date = new Date();
  const thisDate = '' + date.getDate();
  const thisMonth = '' + (date.getMonth() + 1);

  const birthToday = await admin.firestore().collection('characters').where('birthday_month', '==', thisMonth).where('birthday_date', '==', thisDate).get();
  birthToday.forEach(c => {
    console.log(c.data());
  });
});
