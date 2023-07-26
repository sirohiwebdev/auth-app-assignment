import "reflect-metadata";
import app from "./app";
import { mongoDB } from "./lib/db/connection";

const PORT = process.env.PORT || "3000";

console.log("Initializing Application");
mongoDB
  .initialize()
  .then((d) => {
    console.log("Connected to DB: ", d.driver.database, d.isInitialized);
    const server = app.listen(Number(PORT), () => {
      console.log(`Server listening on port http://localhost:${PORT}`);
    });
    const close = () => {
      console.log("Closing server, exiting process");
      if (mongoDB.isInitialized) {
        mongoDB
          .destroy()
          .then(() => {
            server.close();
          })
          .catch((d) => {
            server.close();
          });
      }
      server.close();
    };
    process.on("SIGTERM", close);
    process.on("SIGINT", close);
  })
  .catch((e) => {
    console.error(e)
    process.exit(1);
  });
