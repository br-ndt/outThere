import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import rootRouter from "./routes/rootRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

const app = express();
const port = process.env.APP_SERVER_PORT || 8000;

app.use(express.static(path.join(__dirname, "./public")));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.use(rootRouter);

app.listen(port, () => console.log(`Listening on port ${port}!`));
