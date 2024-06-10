const express = require("express");
const {
  addFavorites,
  deleteFavorites,
  fav
} = require("../controller/favorites");
const favoritesRouter = express.Router();
const authentication = require("../middleware/authentication");
favoritesRouter.post("/add", authentication, addFavorites);
favoritesRouter.delete("/delete/:id", deleteFavorites);
favoritesRouter.get("/",authentication, fav);
module.exports = favoritesRouter;
