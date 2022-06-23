export interface User {
  [index: string]: string | number | string[];
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export interface IDataBase {
  [index: string]: User;
}
