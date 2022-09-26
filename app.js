import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./server/routes/planner.route.js";
import { createID, getPlanBySlotID } from "./views/template_functions.js";

const app = express();

// Middleware & config
dotenv.config();
console.log(process.env);
const PORT = process.env.PORT || 8000;
const URI = process.env.PLANNER_DB_URI;

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));

app.locals.getPlanBySlotID = getPlanBySlotID;
app.locals.createID = createID;

// Routes
app.use("/", router);
app.all("*", (req, res) => res.status(404).send("Resource not found!"));

mongoose
  .connect(URI, { useNewUrlParser: true })
  .catch((err) => {
    console.error(err.stack);
  })
  .then(async (client) => {
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  });
