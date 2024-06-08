const express = require("express");
const { addFavorites } = require("../controller/fav");
const favRouter = express.Router();

const authentication = require("../middleware/authentication");
favRouter.post("/add", authentication, addFavorites);
module.exports = favRouter;
