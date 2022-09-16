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

planSchema.statics.deleteByUser = async function (userid) {
  try {
    const deleted = await this.deleteMany({ user: userid });
    console.log(`[DELETE] Plans for ${userid}: ${deleted}`);
  } catch (error) {
    console.log(error);
  }
};

const Plan = mongoose.model("Plan", planSchema);

export { Plan };
