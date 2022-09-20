import { Task } from "../../models/tasks.js";

async function postTask(req, res) {
  try {
    const task = new Task(req.body);
    await task.save();
    console.log(`[CREATE] New task ${task}`);
    res.redirect("tasks");
  } catch (error) {
    console.log(err);
  }
}

async function getTasks(req, res) {
  const allTasks = await Task.find();
  res.render("pages/manage_tasks", { allTasks });
}

async function deleteTask(req, res) {
  const taskid = req.params.id;
  try {
    const task = await Task.findOneAndRemove({ _id: taskid });
    console.log(`[DELETE] Task ${task}`);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/tasks");
}

export { getTasks, postTask, deleteTask };
