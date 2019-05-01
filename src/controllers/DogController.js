const Dog = require("../models/Dog");

module.exports = {
  async index(req, res) {
    const dogs = await Dog.find({});

    return res.json(dogs);
  }
};
