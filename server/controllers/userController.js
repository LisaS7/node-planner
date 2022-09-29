import { Plan } from "../../models/plan.js";
import { User } from "../../models/users.js";

async function getUsers(req, res) {
  const allUsers = await User.find();
  res.render("manage_users", { allUsers });
}

async function postUser(req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    console.log(`[CREATE] New user ${user}`);
    res.redirect("/users");
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(req, res) {
  const userid = req.params.id;
  try {
    const user = await User.findOneAndRemove({ _id: userid });
    console.log(`[DELETE] User ${user}`);
    await Plan.deleteByUser(userid);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/users");
}

async function clearUserPlans(req, res) {
  const userid = req.params.id;
  try {
    const user = await User.findOne({ _id: userid });
    await Plan.deleteByUser(user);
  } catch (error) {
    console.log(error);
  }
  res.redirect("./");
}

export { getUsers, postUser, deleteUser, clearUserPlans };
