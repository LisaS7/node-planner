import path from "path";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./server/routes/planner.route.js";
import { createID, getPlanBySlotID } from "./views/template_functions.js";
import { fileURLToPath } from "url";

const app = express();

// Middleware & config
dotenv.config();
const PORT = process.env.PORT || 8000;
const URI = process.env.PLANNER_DB_URI;
const basePath = path.dirname(fileURLToPath(import.meta.url));
const contextPath = "/planner";

app.set("view engine", "ejs");
app.set("views", path.join(basePath, "views/pages"));
app.use(
  `${contextPath}/public/`,
  express.static(path.join(basePath, "/public/"))
);
app.use(express.urlencoded({ extended: true }));

app.locals.getPlanBySlotID = getPlanBySlotID;
app.locals.createID = createID;

// Routes
app.use("/planner/", router);
app.all("*", (req, res) => res.status(404).send(`Resource not found: ${req}`));

mongoose
  .connect(URI, { useNewUrlParser: true })
  .catch((err) => {
    console.log("Failed to connect to database");
    console.error(err.stack);
  })
  .then(async (client) => {
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  });
