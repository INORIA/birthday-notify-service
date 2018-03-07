export interface IWork {
  name: string;
  category: string;
}

export class Work implements IWork {

  name = '';
  category = '';

  constructor() {
  }
}
