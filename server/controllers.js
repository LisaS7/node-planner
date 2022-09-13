import fs from "fs";
import { Task } from "../models/tasks.js";
import { Plan } from "../models/plan.js";

// Helper Functions
function getJSONData(filepath) {
  let data = fs.readFileSync(filepath, "utf8");
  return JSON.parse(data);
}

// Restructure single object returned by request to fit Plan model
// example: {value1: value2} becomes {slot: value1, task: value2}
const formatData = (obj) => {
  const res = [];
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    res.push({
      slot: key,
      task: obj[key],
    });
  });
  return res;
};

// Route functions
const calendar = async (req, res) => {
  const tasks = await Task.find();
  let { weekdays, times } = getJSONData("config.json");

  res.render("pages/index", { tasks, weekdays, times });
};

const saveCalendar = async (req, res) => {
  try {
    Plan.clearAll();
    let data = formatData(req.body);
    Plan.insertMany(data);
  } catch (error) {
    console.log(error);
  }
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

export { calendar, saveCalendar, addTask, getTasks, users };
