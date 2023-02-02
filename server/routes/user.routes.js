const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });

router.patch("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    // todo: userId === current user id
    if (userId) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.status(200).send(updatedUser);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      massage: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const list = await User.find();

    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      massage: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
module.exports = router;
