import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRouter from "./routes/UserRoute.js";
import CrudRouter from "./routes/CrudRoute.js";
import AuthRouter from "./routes/AuthRoute.js";
import cors from "cors";

dotenv.config();
const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db
});

// (async () => {
//   await db.sync();
// })();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    origin: "http://localhost:5042",
    credentials: true,
  })
);
app.use(express.json());
app.use(UserRouter);
app.use(CrudRouter);
app.use(AuthRouter);

// store.sync();

app.listen(process.env.PORT, () => {
  console.log("Server running at port 2257");
});
