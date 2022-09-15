import { Task } from "../models/tasks.js";
import { Plan } from "../models/plan.js";
import { User } from "../models/users.js";

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

const getPlanner = async (req, res) => {
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
};

const postPlanner = async (req, res) => {
  const selectedUser = req.query.user;
  console.log(selectedUser);
  if (selectedUser) {
    await Plan.deleteMany({ user: selectedUser });
    let data = formatData(req.body, selectedUser);
    Plan.insertMany(data);
  }
  res.redirect(`/?user=${selectedUser}`);
};

const postTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.redirect("tasks");
  } catch (error) {
    console.log(err);
  }
};

const getTasks = async (req, res) => {
  const allTasks = await Task.find();
  console.log(allTasks);
  res.render("pages/manage_tasks", { allTasks });
};

const getUsers = async (req, res) => {
  const allUsers = await User.find();
  res.render("pages/manage_users", { allUsers });
};

const postUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect("users");
  } catch (error) {
    console.log(error);
  }
};

export {
  getPlanner,
  postPlanner,
  postTask,
  getTasks,
  getUsers,
  postUser,
  admin,
  colourPlans,
  formatData,
};
