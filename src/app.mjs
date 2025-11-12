import express from "express";
import routes from "./routes/index.mjs";

const app = express();

app.use(express.json())
app.use('/api', routes)

export default app
