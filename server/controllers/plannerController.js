import { Task } from "../../models/tasks.js";
import { Plan } from "../../models/plan.js";
import { User } from "../../models/users.js";
import * as myFxs from "./functions.js";

function admin(req, res) {
  res.render("pages/admin");
}

async function getPlanner(req, res) {
  const weekdays = myFxs.stringToArray(process.env.WEEKDAYS);
  const times = myFxs.stringToArray(process.env.TIMES);

  const tasks = await Task.find();
  const users = await User.find();
  const selectedUser = users.find((user) => user._id == req.query.user);

  let plans = {};
  let selectedName = "";
  if (selectedUser) {
    plans = await Plan.find({ user: selectedUser._id });
    myFxs.colourPlans(plans, tasks);
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

  await Plan.deleteByUser(selectedUser);
  let data = myFxs.formatData(req.body, selectedUser._id);
  await Plan.addPlans(selectedUser.name, data);
  res.redirect(`/?user=${selectedUser._id}`);
}

export { getPlanner, postPlanner, admin };
