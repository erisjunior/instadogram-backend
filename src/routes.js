const express = require("express");

const routes = express.Router();

const DogController = require("./controllers/DogController");
const LikeController = require("./controllers/LikeController");
const BookmarkController = require("./controllers/BookmarkController");

routes.get("/dogs", DogController.index);
routes.get("/bookmarks/:user", DogController.indexBookmarkeds);

routes.post("/likes", LikeController.store);

routes.post("/bookmarks", BookmarkController.store);

module.exports = routes;
