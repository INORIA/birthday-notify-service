import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Twitter from 'twitter';

export const cronTwitterTodayBirthdayFunc = functions.pubsub.topic('hourly-tick').onPublish(async event => {
  const date = new Date();
  const thisDate = date.getDate();
  const thisMonth = date.getMonth() + 1;

  const birthToday = await admin.firestore().collection('characters').where('birthday_month', '==', thisMonth).where('birthday_date', '==', thisDate).get();
  birthToday.forEach(c => {
    console.log(c.data());

    try {
      const client = new Twitter({
        consumer_key: functions.config().twitter.consumer_key,
        consumer_secret: functions.config().twitter.consumer_secret,
        access_token_key: functions.config().twitter.access_token_key,
        access_token_secret: functions.config().twitter.access_token_secret
      });

      const data = c.data();
      const body = `${data.name}`;

      client.post('statuses/update', {status: body}).catch(e => {
        console.log(e);
      });
    } catch (e) {
      console.log(e.message);
    }
  });
});
