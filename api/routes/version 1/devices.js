//@ts-check
const express = require("express");
const {
  getDevices,
  getDevice
} = require("../../controllers/version 1/devices");

const router = express.Router();

router.get("/", getDevices);
router.get("/:id", getDevice);

router.put("/:id/state/:state", (req, res) => {
  res.json({
    ok: "ok"
  });
});

module.exports = router;
