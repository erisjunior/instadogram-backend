const express = require("express");

const routes = express.Router();

const DogController = require("./controllers/DogController");
const LikeController = require("./controllers/LikeController");

routes.get("/tweets", DogController.index);
routes.post("/tweets", DogController.store);

routes.post("/likes/:id", LikeController.store);

module.exports = routes;
