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
  const weekdays = stringToArray(process.env.WEEKDAYS);
  const times = stringToArray(process.env.TIMES);

  const tasks = await Task.find();
  const users = await User.find();
  const selectedUser = users.find((user) => user._id == req.query.user);

  let plans = {};
  let selectedName = "";
  if (selectedUser) {
    plans = await Plan.find({ user: selectedUser._id });
    colourPlans(plans, tasks);
    selectedName = selectedUser.name;
  }

  res.render("pages/index", {
    tasks,
    plans,
    selectedName,
    users,
    weekdays,
    times,
  });
}

async function postPlanner(req, res) {
  const selectedUser = await User.findOne({ _id: req.query.user });
  if (selectedUser) {
    await Plan.deleteMany({ user: selectedUser._id }).catch((error) => {
      console.log(
        `[ERROR] Failed to delete existing documents from database for ${selectedUser._id} ${selectedUser.name}`
      );
      console.log(error);
    });
    let data = formatData(req.body, selectedUser._id);
    Plan.insertMany(data).catch((error) => {
      console.log(`[ERROR] Failed to create documents`);
      console.log(error);
    });
  }
  res.redirect(`/?user=${selectedUser._id}`);
}

export { getPlanner, postPlanner, admin, colourPlans, formatData };
