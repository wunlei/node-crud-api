import { IDataBase, User } from "../types/index.types";

class DataBase {
  db: IDataBase;
  constructor() {
    this.db = {};
  }

  delete(id: string) {
    delete this.db[id];
  }

  add(data: User) {
    this.db[data.id] = data;
  }

  get(id: string) {
    return this.db[id];
  }

  update(data: User) {
    this.db[data.id] = data;
  }

  getAll() {
    return Object.values(this.db);
  }
}
const db = new DataBase();

export { db, DataBase };
