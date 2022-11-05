const express = require("express");
const { requiresAuth } = require('express-openid-connect');
const router = express.Router();
const userControllers = require("../controllers/userControllers");

router
  .route("/")
  .get(requiresAuth(), userControllers.getAllUsers)
  .post(requiresAuth(), userControllers.createNewUser);
  
router.route("/:sub").get(requiresAuth(), userControllers.getUserBySub);

module.exports = router;