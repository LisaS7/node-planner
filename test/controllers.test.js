import { colourPlans, formatData } from "../server/controllers/functions.js";

const unformattedTestObject = {
  time: "task",
};

describe("Formatting", () => {
  test("Formatting", () => {
    expect(formatData(unformattedTestObject, "user1")).toStrictEqual([
      {
        slot: "time",
        task: "task",
        user: "user1",
      },
    ]);
  });
});
