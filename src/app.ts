import express, { json, urlencoded } from "express";
import appRouter from "./routes";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler";
import session from "express-session";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret-value",
    saveUninitialized: true,
    resave: false,
  }),
);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms"),
);
app.use("/v1", appRouter);
app.get("/", (req, res, next) => {
  return res.send("OK");
});

app.use(errorHandler);

export default app;
