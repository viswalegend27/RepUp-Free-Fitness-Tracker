const { StrengthTraining, User } = require("../models");
const mongoose = require("mongoose");

module.exports = {
  // ✅ Create Strength Training
  createStrengthTraining(req, res) {
    const { name, weight, sets, reps, date } = req.body;
    const userId = req.user._id; // ✅ FIXED: use _id instead of id

    console.log("💪 Incoming Strength Data:", { name, weight, sets, reps, date, userId });

    StrengthTraining.create({ name, weight, sets, reps, date, userId })
      .then((dbStrengthData) => {
        console.log("✅ StrengthTraining Created:", dbStrengthData);

        return User.findOneAndUpdate(
          { _id: userId },
          { $push: { strengthTraining: dbStrengthData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          console.warn("⚠️ User not found while linking strength training!");
          return res.status(404).json({ message: "Strength training created but no user found!" });
        }

        console.log("👤 User Updated with StrengthTraining:", dbUserData.username);
        res.json({ message: "Strength training successfully created!" });
      })
      .catch((err) => {
        console.error("❌ Error in createStrengthTraining:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
      });
  },

  // ✅ Get all Strength Training records for a user
  getStrengthTrainingRecords(req, res) {
    try {
      const userId = req.user._id; // ✅ FIXED
      console.log("📥 Fetching strength records for userId:", userId);

      StrengthTraining.find({ userId })
        .then((dbStrengthData) => {
          console.log("📤 Found Strength Records:", dbStrengthData.length);
          res.status(200).json(dbStrengthData);
        })
        .catch((err) => {
          console.error("❌ Error fetching strength records:", err);
          res.status(500).json({ message: 'Error fetching strength records', error: err });
        });
    } catch (err) {
      console.error("🔒 Unauthorized access:", err);
      res.status(401).json({ message: 'Unauthorized' });
    }
  },

  // Get one Strength Training record by ID
  getStrengthTrainingById({ params }, res) {
    StrengthTraining.findOne({ _id: params.id })
      .then((dbStrengthData) => {
        if (!dbStrengthData) {
          console.warn("❌ No strength record found for ID:", params.id);
          return res.status(404).json({ message: "No strength training data found with this id!" });
        }

        console.log("📄 Strength Record Retrieved:", dbStrengthData);
        res.json(dbStrengthData);
      })
      .catch((err) => {
        console.error("❌ Error retrieving strength training by ID:", err);
        res.status(500).json(err);
      });
  },

  // ✅ Delete Strength Training data
  deleteStrengthTraining({ params }, res) {
    StrengthTraining.findOneAndDelete({ _id: params.id })
      .then((dbStrengthData) => {
        if (!dbStrengthData) {
          return res.status(404).json({ message: "No strength training data found with this id!" });
        }

        console.log("🗑️ StrengthTraining Deleted:", dbStrengthData._id);

        // ✅ Convert string ID to ObjectId
        const strengthId = new mongoose.Types.ObjectId(params.id);

        // ✅ Pull the deleted training from user's array
        return User.findOneAndUpdate(
          { strengthTraining: strengthId },
          { $pull: { strengthTraining: strengthId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          console.warn("⚠️ Strength training deleted but no user found.");
          return res.status(404).json({ message: "Strength training deleted but no user with this id!" });
        }

        console.log("✅ User updated:", dbUserData.username);
        res.json({ message: "Strength training successfully deleted!" });
      })
      .catch((err) => {
        console.error("❌ Error deleting strength training:", err);
        res.status(500).json(err);
      });
  }
};
