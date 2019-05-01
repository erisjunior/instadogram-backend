const express = require("express");

const routes = express.Router();

const DogController = require("./controllers/DogController");
const LikeController = require("./controllers/LikeController");
const BookmarkController = require("./controllers/BookmarkController");

routes.get("/dos", DogController.index);
routes.post("/dogs", DogController.store);

routes.post("/likes", LikeController.store);

routes.post("/bookmarks", BookmarkController.store);

module.exports = routes;
