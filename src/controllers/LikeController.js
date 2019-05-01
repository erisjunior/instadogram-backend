const Dog = require("../models/Dog");

module.exports = {
  async store(req, res) {
    const dog = await Dog.findById(req.params.id);

    dog.set({ likes: dog.likes + 1 });

    await dog.save();

    req.io.emit("like", dog);

    return res.json(dog);
  }
};
