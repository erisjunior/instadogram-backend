const Dog = require("../models/Dog");

module.exports = {
  async store(req, res) {
    const dogs = await Dog.find({ id: req.body.id });

    if (dogs.length < 1) {
      const dog = await Dog.create({
        id: req.body.id,
        bookmarkeds: [{ user: req.body.user }]
      });

      req.io.emit("bookmark", dogs[0]);
    } else {
      const find = await Dog.find({
        id: req.body.id,
        bookmarkeds: {
          $elemMatch: {
            user: req.body.user
          }
        }
      });

      if (find.length > 0) {
        let users = dogs[0].bookmarkeds;
        const newUsers = users.map(user => {
          if (user.user === req.body.user) return;
          return user;
        });
        const filteredUser = newUsers.filter(function(el) {
          return el != null;
        });

        dogs[0].set({ bookmarkeds: filteredUser });

        await dogs[0].save();

        req.io.emit("unbookmark", dogs[0]);
      } else {
        let users = dogs[0].bookmarkeds;
        users.push({ user: req.body.user });

        dogs[0].set({ bookmarkeds: users });

        await dogs[0].save();

        req.io.emit("bookmark", dogs[0]);
      }
    }
  }
};
