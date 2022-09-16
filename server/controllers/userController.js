import { Plan } from "../../models/plan.js";
import { User } from "../../models/users.js";

async function getUsers(req, res) {
  const allUsers = await User.find();
  res.render("pages/manage_users", { allUsers });
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

export { getUsers, postUser, deleteUser };
