import mongoose from "mongoose";
const Schema = mongoose.Schema;

const planSchema = new Schema({
  slot: {
    type: String,
    required: true,
  },
  task: {
    type: String,
  },
  colour: {
    type: String,
  },
  user: {
    type: String,
  },
});

planSchema.statics.deleteByUser = async function (user) {
  try {
    const deleted = await this.deleteMany({ user: user._id });
    console.log(`[DELETE] Old plans for ${user.name} (${user._id})`);
    console.log(deleted);
  } catch (error) {
    console.log(
      `[ERROR] Failed to delete existing documents from database for ${user.name} (${user._id})`
    );
  }
};

planSchema.statics.addPlans = async function (name, data) {
  try {
    const added = await Plan.insertMany(data);
    const newPlans = added
      .filter((item) => item.task !== "")
      .map(({ slot, task }) => {
        return { slot, task };
      });
    console.log(`[CREATE] New plans for ${name}`);
    console.log(newPlans);
  } catch (error) {
    console.log(`[ERROR] Failed to create documents`);
    console.log(data);
    console.log(error);
  }
};

const Plan = mongoose.model("Plan", planSchema);

export { Plan };
