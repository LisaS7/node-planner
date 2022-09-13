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
  user: {
    type: String,
  },
});

planSchema.statics.clearAll = function () {
  this.deleteMany({}).catch((error) => {
    console.log(error);
  });
};

const Plan = mongoose.model("Plan", planSchema);

export { Plan };
