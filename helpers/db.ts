import * as SQLite from "expo-sqlite";
import { WebSQLDatabase } from "expo-sqlite";

const db: WebSQLDatabase = SQLite.openDatabase("places.db");

interface insertPlaceI {
  title: string;
  image: string;
  address: string;
  lat: number;
  long: number;
}

export const init = () => {
  const promise = new Promise((res: any, rej: any) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, image TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);",
        [],
        () => {
          return res();
        },
        (_, e) => {
          return rej(e);
        }
      );
    });
  });
  return promise;
};

export const insertPlace = (
  title: string,
  image: string,
  address: string,
  lat: number,
  long: number
) => {
  console.log(title);
  const promise = new Promise((res: any, rej: any) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, image, address, lat, lng) VALUES (?,?,?,?,?)`,
        [title, image, address, lat, long],
        (_, result) => {
          return res(result);
        },
        (_, e) => {
          return rej(e);
        }
      );
    });
  });
  return promise;
};
