const Dog = require("../models/Dog");

module.exports = {
  async store(req, res) {
    const dogs = await Dog.find({ id: req.body.id });

    if (dogs.length < 1) {
      const dog = await Dog.create({
        id: req.body.id,
        likes: 1,
        url: req.body.url,
        likeds: [{ user: req.body.user }]
      });

      req.io.emit("like", dog);
    } else {
      const find = await Dog.find({
        id: req.body.id,
        likeds: {
          $elemMatch: {
            user: req.body.user
          }
        }
      });

      if (find.length > 0) {
        let users = dogs[0].likeds;
        const newUsers = users.map(user => {
          if (user.user === req.body.user) return;
          return user;
        });
        const filteredUser = newUsers.filter(function(el) {
          return el != null;
        });

        dogs[0].set({ likes: dogs[0].likes - 1, likeds: filteredUser });

        await dogs[0].save();

        req.io.emit("dislike", dogs[0]);
      } else {
        let users = dogs[0].likeds;
        users.push({ user: req.body.user });

        dogs[0].set({ likes: dogs[0].likes + 1, likeds: users });

        await dogs[0].save();

        req.io.emit("like", dogs[0]);
      }
    }
  }
};
