import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Twitter from 'twitter';

const tweet = tweetText => {
  const client = new Twitter({
    consumer_key: functions.config().twitter.consumer_key,
    consumer_secret: functions.config().twitter.consumer_secret,
    access_token_key: functions.config().twitter.access_token_key,
    access_token_secret: functions.config().twitter.access_token_secret
  });

  return client.post('statuses/update', { status: tweetText }).catch(e => {
    console.log(e);
    throw (e);
  });
};

const saveLog = ({ character_id, text, date = new Date() }) => {
  const collection = admin.firestore().collection('tweet_logs');
  return collection.add({ character_id, date, text });
};

export const cronTwitterTodayBirthdayFunc = functions.pubsub.topic('hourly-tick').onPublish(async event => {
  const date = new Date();
  const thisDate = date.getDate();
  const thisMonth = date.getMonth() + 1;

  const birthToday = await admin.firestore().collection('characters').where('birthday_month', '==', thisMonth).where('birthday_date', '==', thisDate).get();
  birthToday.forEach(async c => {
    try {
      const characterId = c.id;
      const collection = admin.firestore().collection('tweet_logs');
      const doc = await collection.where('character_id', '==', characterId).limit(1).get();

      if (!doc.empty) {
        console.log(`found: ${characterId}`);
        return;
      }

      const data = c.data();
      const body = `今日は${data.name}の誕生日です！`;

      await tweet(body);
      await saveLog({ character_id: characterId, text: body });

      console.log(`added ${characterId}`);
    } catch (e) {
      console.log(e.message);
    }
  });
});
