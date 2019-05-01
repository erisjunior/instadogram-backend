const Dog = require("../models/Dog");

module.exports = {
  async index(req, res) {
    const dogs = await Dog.find({});

    return res.json(dogs);
  },

  async store(req, res) {
    const dog = await Dog.create(req.body);

    req.io.emit("dog", dog);

    return res.json(dog);
  }
};
