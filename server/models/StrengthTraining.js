const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const strengthTrainingSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  weight: {
    type: Number,
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  reps: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

const StrengthTraining = model('StrengthTraining', strengthTrainingSchema);

module.exports = StrengthTraining;