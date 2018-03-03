export interface ICharacter {
  id: string;
  name: string;
  ruby: string;
  image: string;
  birthday_month: number;
  birthday_date: number;
}

export class Character implements ICharacter {

  id = '';
  name = '';
  ruby = '';
  image = '';
  birthday_month;
  birthday_date;

  constructor() {
  }
}
