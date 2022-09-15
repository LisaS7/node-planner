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
function formatData(obj) {
  const res = [];
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    res.push({
      slot: key,
      task: obj[key],
    });
  });
  return res;
}

// Assign colours to each document in plans collection if there is a task scheduled
async function colourPlans(plans) {
  for (const plan of plans) {
    if (plan.task) {
      const task = await Task.findOne({ name: plan.task });
      plan.colour = task.colour;
    }
  }
  return plans;
}

// Route functions

const planner = async (req, res) => {
  const tasks = await Task.find();
  const plans = await Plan.find();
  await colourPlans(plans);
  let { weekdays, times } = getJSONData("config.json");
  res.render("pages/index", { tasks, plans, weekdays, times });
};

const savePlanner = async (req, res) => {
  try {
    Plan.clearAll();
    let data = formatData(req.body);
    Plan.insertMany(data);
    res.redirect("/");
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

export { planner, savePlanner, addTask, getTasks, users };
