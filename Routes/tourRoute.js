const express = require("express");
const tourhandler = require("../Controllers/tourhandler");
const router = express.Router();

router.route("/").get(tourhandler.getAllTours).post(tourhandler.createNewTour);
router.route("/:id").get(tourhandler.getTour).patch(tourhandler.updateTour);

module.exports = router;
