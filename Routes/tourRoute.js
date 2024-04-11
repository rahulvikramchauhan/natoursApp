const express = require("express");
const tourhandler = require("../Controllers/tourhandler");
const router = express.Router();

// router.param("id", tourhandler.checkId);
router.get("/getMonthlyStas/:year",tourhandler.getMonthlyStas);
router.get("/getMonthlyStas",tourhandler.getMonthlyStas);
router.get("/top-5-tours",tourhandler.getbestTour,tourhandler.getAllTours)

router
  .route("/")
  .get(tourhandler.getAllTours)
  .post(tourhandler.createNewTour);
router.route("/:id").get(tourhandler.getTour).patch(tourhandler.updateTour).delete(tourhandler.deleteTourbyId);

module.exports = router;
