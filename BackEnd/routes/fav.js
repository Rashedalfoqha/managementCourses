const express = require("express");
const { addFavorites, deleteFavorites } = require("../controller/fav");
const favRouter = express.Router();
const authentication = require("../middleware/authentication");
favRouter.post("/add", authentication, addFavorites);
favRouter.delete("/delete/:id", deleteFavorites);
module.exports = favRouter;
