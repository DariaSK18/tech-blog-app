import express from "express";
import routes from "./routes/index.mjs";
import errorHandler from "./middleware/errorHandler.mjs";
import AppError from "./utils/AppError.mjs";
import { isUser } from "./middleware/auth.mjs";
import pageRoutes from "./routes/pageRoutes.mjs";
import session from "express-session";
import passport from "./strategies/local-strategy.mjs";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

dotenv.config();

const app = express();

const mongoUri = process.env.MONGO_URI || "mongodb://localhost/";

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(`Error: ${err}`));

app.set('views', './src/views')
app.set("view engine", "ejs");
app.use(express.static("src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60, // one hour
    },
    store: MongoStore.create({
      // client: mongoose.connection.getClient(),
      mongoUrl: mongoUri,
      collectionName: "session",
    }),
  })
);
app.use(passport.initialize())
app.use(passport.session())

app.use(isUser);

app.use("/", pageRoutes);
app.use("/api", routes);

// app.all('/*', (req, res, next) => {
//     next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
// })
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

export default app;
