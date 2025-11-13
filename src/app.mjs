import express from "express";
import routes from "./routes/index.mjs";
import errorHandler from "./middleware/errorHandler.mjs";
import AppError from "./utils/AppError.mjs";
import { isUser } from "./middleware/auth.mjs";
import pageRoutes from "./routes/pageRoutes.mjs";

const app = express();
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(isUser)

app.use('/', pageRoutes)
app.use('/api', routes)

// app.all('/*', (req, res, next) => {
//     next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
// })
app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(errorHandler)

export default app
