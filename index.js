import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import getDB from "./server/database.js";
import router from "./server/routes/planner.route.js";

const app = express();

// Middleware & config
dotenv.config();
const PORT = process.env.PORT || 8000;
const URI = process.env.PLANNER_DB_URI;

app.set("view engine", "ejs");
app.use(express.static("./public"));

// Routes
app.get("/", router);
app.get("/tasks", router);
app.get("/users", router);
app.all("*", (req, res) => res.status(404).send("Resource not found!"));

mongoose
  .connect(URI, { useNewUrlParser: true })
  .catch((err) => {
    console.error(err.stack);
  })
  .then(async (client) => {
    // let plannerDB = getDB(client);

    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  });