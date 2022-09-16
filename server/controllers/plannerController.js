import { Task } from "../../models/tasks.js";
import { Plan } from "../../models/plan.js";
import { User } from "../../models/users.js";

// Helper Functions
function stringToArray(str) {
  return str.split(",").map((item) => item.trim());
}

// Restructure single object returned by request to fit Plan model
// example: {value1: value2} becomes {slot: value1, task: value2}
function formatData(obj, user) {
  const res = [];
  const keys = Object.keys(obj);
  for (const key of keys) {
    res.push({
      slot: key,
      task: obj[key],
      user: user,
    });
  }
  return res;
}

// Assign colours to each document in plans collection if there is a task scheduled
function colourPlans(plans, tasks) {
  for (const plan of plans) {
    if (plan.task) {
      const task = tasks.find((item) => item.name === plan.task);
      plan.colour = task.colour || process.env.DEFAULT_PLAN_COLOUR;
    }
  }
  return plans;
}

// Route functions

function admin(req, res) {
  res.render("pages/admin");
}

async function getPlanner(req, res) {
  const tasks = await Task.find();
  const users = await User.find();
  const selectedUser = req.query.user;
  const plans = await Plan.find({ user: selectedUser });
  colourPlans(plans, tasks);

  let weekdays = stringToArray(process.env.WEEKDAYS);
  let times = stringToArray(process.env.TIMES);

  res.render("pages/index", {
    tasks,
    plans,
    selectedUser,
    users,
    weekdays,
    times,
  });
}

async function postPlanner(req, res) {
  const selectedUser = req.query.user;
  if (selectedUser) {
    await Plan.deleteMany({ user: selectedUser }).catch((error) => {
      console.log(
        `[ERROR] Failed to delete existing documents from database for ${selectedUser}`
      );
      console.log(error);
    });
    let data = formatData(req.body, selectedUser);
    Plan.insertMany(data).catch((error) => {
      console.log(`[ERROR] Failed to create documents`);
      console.log(error);
    });
  }
  res.redirect(`/?user=${selectedUser}`);
}

export { getPlanner, postPlanner, admin, colourPlans, formatData };
