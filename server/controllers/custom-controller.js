const { CustomExercise, User } = require("../models");

module.exports = {
  
  // CREATE Custom Exercise
  async createCustomExercise(req, res) {
    try {
      console.log("REQ USER DATA:", req.user);
      console.log("REQ HEADERS:", req.headers);

      const { name, fields, date } = req.body;
      console.log("REQ BODY:", req.body);
      const userId = req.user._id;


      const newExercise = await CustomExercise.create({
        name,
        fields,
        date,
        userId
      });

      await User.findByIdAndUpdate(
        userId,
        { $push: { custom: newExercise._id } },
        { new: true }
      );

      res.json({ message: "Custom exercise created!", id: newExercise._id });
    } catch (err) {
      console.error("❌ Error creating custom exercise", err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  // GET one custom exercise
  async getCustomById(req, res) {
    try {
      const exercise = await CustomExercise.findById(req.params.id);
      if (!exercise)
        return res.status(404).json({ message: "No custom exercise found" });

      res.json(exercise);
    } catch (err) {
      console.error("❌ Error getting custom exercise", err);
      res.status(500).json(err);
    }
  },

  // DELETE custom exercise
  async deleteCustomExercise(req, res) {
    try {
      const deleted = await CustomExercise.findByIdAndDelete(req.params.id);

      if (!deleted)
        return res.status(404).json({ message: "No custom exercise found" });

      await User.findOneAndUpdate(
        { custom: deleted._id },
        { $pull: { custom: deleted._id } }
      );

      res.json({ message: "Custom exercise deleted!" });
    } catch (err) {
      console.error("❌ Error deleting custom exercise", err);
      res.status(500).json(err);
    }
  }
};
