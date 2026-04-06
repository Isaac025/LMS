const express = require("express");
const router = express.Router();
const { updateRoleToEducator } = require("../controllers/educatorController");

// Add Educator role
router.get("/update-role", updateRoleToEducator);

module.exports = router;
