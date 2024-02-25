const express = require("express");
const tourhandler = require("../Controllers/tourhandler");
const router = express.Router();

// router.param("id", tourhandler.checkId);
router.get("/top-5-tours",tourhandler.getbesttour,tourhandler.getAllTours)

router
  .route("/")
  .get(tourhandler.getAllTours)
  .post(tourhandler.createNewTour);
router.route("/:_id").get(tourhandler.getTour).patch(tourhandler.updateTour).delete(tourhandler.deleteTourbyId);

module.exports = router;
