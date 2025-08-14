const router = require("express").Router();
const {
  createResistance,
  getResistanceById,
  deleteResistance,
} = require("../../controllers/resistance-controller");

const {
  createCardio,
  getCardioById,
  deleteCardio,
} = require("../../controllers/cardio-controller");

const {
  createStrengthTraining,
  getStrengthTrainingRecords,
  getStrengthTrainingById, // ✅ Make sure it's imported
  deleteStrengthTraining,
} = require("../../controllers/strength-controller");

// Import middleware
const { authMiddleware } = require('../../utils/auth');

// Apply authMiddleware to all routes
router.use(authMiddleware);

// Cardio routes
router.route("/cardio").post(createCardio);
router.route("/cardio/:id").get(getCardioById).delete(deleteCardio);

// Resistance routes
router.route("/resistance").post(createResistance);
router.route("/resistance/:id").get(getResistanceById).delete(deleteResistance);

// Strength Training routes
router.route("/strengthtraining")
  .get(getStrengthTrainingRecords) 
  .post(createStrengthTraining);   

// ✅ ✅ ✅ ADD THIS LINE BELOW
router.route("/strength/:id")
  .get(getStrengthTrainingById)  // ✅ Add GET here
  .delete(deleteStrengthTraining);

router.route("/strengthtraining/:id").delete(deleteStrengthTraining);

module.exports = router;