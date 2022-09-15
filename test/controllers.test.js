const {
  planner,
  postPlanner,
  postTask,
  getTasks,
  users,
  colourPlans,
  formatData,
} = require("../server/controllers.js");

const unformattedTestObject = {
  time: "task",
};

describe("Formatting", () => {
  test("Formatting", () => {
    expect(formatData(unformattedTestObject)).toStrictEqual({
      slot: "time",
      task: "task",
    });
  });
});
