import {
  stringToArray,
  colourPlans,
  formatData,
} from "../server/controllers/functions.js";

const unformattedPlans = {
  Mon10am: "task1",
  Mon11am: "task2",
};

const formattedPlans = [
  { slot: "Mon10am", task: "task1", user: "user1" },
  { slot: "Mon11am", task: "task2", user: "user1" },
];

const plansWithoutTasks = [
  { slot: "Mon10am", user: "user1" },
  { slot: "Mon11am", task: "", user: "user1" },
];

const tasks = [
  { name: "task1", colour: "blue" },
  { name: "task2", colour: "green" },
];

test("Comma separated string to array", () => {
  expect(stringToArray("apples, bananas, strawberries")).toStrictEqual([
    "apples",
    "bananas",
    "strawberries",
  ]);
});

test("Formatting object to db schema", () => {
  expect(formatData(unformattedPlans, "user1")).toStrictEqual(formattedPlans);
});

test("Colour plans", () => {
  expect(colourPlans(formattedPlans, tasks)).toStrictEqual([
    { slot: "Mon10am", task: "task1", user: "user1", colour: "blue" },
    { slot: "Mon11am", task: "task2", user: "user1", colour: "green" },
  ]);
});

test("Colour plans - task not found, use default colour", () => {
  expect(
    colourPlans(formattedPlans, [{ name: "task1", colour: "blue" }])
  ).toStrictEqual([
    { slot: "Mon10am", task: "task1", user: "user1", colour: "blue" },
    {
      slot: "Mon11am",
      task: "task2",
      user: "user1",
      colour: process.env.DEFAULT_PLAN_COLOUR,
    },
  ]);
});

test("Colour plans - plan without task is ignored", () => {
  expect(colourPlans(plansWithoutTasks, tasks)).toStrictEqual(
    plansWithoutTasks
  );
});
