// Convert comma delimited strings from .env file into arrays
function stringToArray(str) {
  return str.split(",").map((item) => item.trim());
}

// Restructure the body returned by planner POST request to fit database Plan model
// and include the user id. Returns an array of objects.
// example: {value1: value2} becomes {slot: value1, task: value2, user: user}
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
      try {
        const task = tasks.find((item) => item.name === plan.task);
        plan.colour = task.colour;
      } catch (error) {
        plan.colour = process.env.DEFAULT_PLAN_COLOUR;
      }
    }
  }
  return plans;
}

export { stringToArray, formatData, colourPlans };
