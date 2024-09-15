import fs from "node:fs/promises";

const databasePath = new URL("db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, "utf-8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter((row) => {
        return Object.entries(search).some(([key, value]) => {
          return String(row[key]).includes(value);
        });
      });
    }

    return data;
  }

  insert(table, data) {
    const previousData = this.#database[table];

    if (Array.isArray(previousData)) {
      previousData.push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();
  }

  delete(table, id) {
    const rowIndex = (this.#database[table] || []).findIndex(
      (row) => row.id === id
    );

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    } else {
      throw Error("not_found");
    }
  }

  update(table, id, data) {
    const rowIndex = (this.#database[table] || []).findIndex(
      (row) => row.id === id
    );

    if (rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data };
      this.#persist();
    } else {
      throw Error("not_found");
    }
  }
}
