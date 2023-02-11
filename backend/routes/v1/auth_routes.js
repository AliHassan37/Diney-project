const express = require("express");
const router = express.Router();

const auth = require("../../api/v1/Controllers/Auth/AuthienticationController");

router.post("/login", auth.login);
router.patch("/video", auth.video);
router.patch("/music", auth.music);
router.post("/signup", auth.signUp);
router.patch("/update", auth.update);
router.patch("/background", auth.background);
router.post("/forgotPassword", auth.forgotPassword);

module.exports = router;
