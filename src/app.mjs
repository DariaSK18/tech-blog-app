import express from "express";
import routes from "./routes/index.mjs";
import errorController from "./controllers/errorController.mjs";
import AppError from "./utils/AppError.mjs";

const app = express();

app.use(express.json())
app.use('/api', routes)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(errorController)

export default app
