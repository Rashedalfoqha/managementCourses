const express = require("express");
const { addFavorites, deleteFavorites } = require("../controller/favorites");
const favoritesRouter = express.Router();
const authentication = require("../middleware/authentication");
favoritesRouter.post("/add", authentication, addFavorites);
favoritesRouter.delete("/delete/:id", deleteFavorites);
module.exports = favoritesRouter;
