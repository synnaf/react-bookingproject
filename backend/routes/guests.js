let Guest = require("../models/guest.model");
const router = require("express").Router();

router.route("/").get((req, res) => {
  Guest.find()
    .then((guests) => res.json(guests))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
