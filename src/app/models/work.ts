import { DocumentReference } from "@firebase/firestore-types";

export interface IWork {
  name: string;
  category: string;
  categories?: DocumentReference[];
}

export class Work implements IWork {

  name = '';
  category = '';

  constructor() {
  }
}
