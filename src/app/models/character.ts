import { DocumentReference } from "@firebase/firestore-types";

export interface ICharacter {
  id: string;
  name: string;
  ruby: string;
  image: string;
  birthday_month: number;
  birthday_date: number;
  work: DocumentReference;
}

export class Character implements ICharacter {

  id = '';
  name = '';
  ruby = '';
  image = '';
  birthday_month;
  birthday_date;
  work;

  constructor() {
  }
}
