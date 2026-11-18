import { initDb, pool } from "./db";

initDb()
  .then(() => pool.end())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
