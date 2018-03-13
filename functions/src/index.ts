import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { followCharacterFunc } from './follow';

admin.initializeApp(functions.config().firebase);

export const followCharacter = followCharacterFunc;
