const Dog = require("../models/Dog");

module.exports = {
  async index(req, res) {
    const dogs = await Dog.find({});

    return res.json(dogs);
  },
  async indexBookmarkeds(req, res) {
    const dogs = await Dog.find({
      bookmarkeds: {
        $elemMatch: {
          user: req.params.user
        }
      }
    });

    return res.json(dogs);
  }
};
