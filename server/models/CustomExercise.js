const { Schema, model } = require("mongoose");

const CustomExerciseSchema = new Schema(
{
  type: {
    type: String,
    default: "custom",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  fields: {
    type: Object, // 🔥 Flexible dynamic fields stored as JSON
    default: {}
  },
  date: {
    type: Date,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
},
{ timestamps: true }
);

module.exports = model("CustomExercise", CustomExerciseSchema);
