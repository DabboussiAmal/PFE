const express = require("express");
const auth = require("../utils/authMiddleware");
const _ = require("../controllers/auth.js");

const router = express.Router();

router.post("/login", _.loginController);
router.get("/verify-token", auth, _.verifyTokenController);

module.exports = router;