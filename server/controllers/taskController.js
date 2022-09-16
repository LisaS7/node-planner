import { Task } from "../../models/tasks.js";

async function postTask(req, res) {
  try {
    const task = new Task(req.body);
    await task.save();
    res.redirect("tasks");
  } catch (error) {
    console.log(err);
  }
}

async function getTasks(req, res) {
  const allTasks = await Task.find();
  console.log(allTasks);
  res.render("pages/manage_tasks", { allTasks });
}

export { getTasks, postTask };
