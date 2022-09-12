import fs from "fs";
import { Task } from "../models/tasks.js";

// Helper Functions
function getJSONData(filepath) {
  let data = fs.readFileSync(filepath, "utf8");
  return JSON.parse(data);
}

const calendar = async (req, res) => {
  const tasks = await Task.find();
  console.log(tasks)
  let { weekdays, times } = getJSONData("config.json");

  res.render("pages/index", { tasks, weekdays, times });
};

const addTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    const allTasks = await Task.find();
    res.render("pages/manage_tasks", { allTasks });
  } catch (error) {
    console.log(err);
  }
};

const getTasks = (req, res) => {
  const allTasks = Task.find();
  res.render("pages/manage_tasks", { allTasks });
};

const users = (req, res) => {
  res.render("pages/manage_users");
};

export { calendar, addTask, getTasks, users };
