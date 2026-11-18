import app from "./app";
import { PORT } from "./config/config";
import { initDb } from "./db/db";

const start = async () => {
  await initDb();
  app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
  });
};

start().catch((error) => {
  console.error("Could not start the server", error);
  process.exit(1);
});
