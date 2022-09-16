import { User } from "../../models/users.js";

async function getUsers(req, res) {
  const allUsers = await User.find();
  res.render("pages/manage_users", { allUsers });
}

async function postUser(req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    res.redirect("users");
  } catch (error) {
    console.log(error);
  }
}

export { getUsers, postUser };
