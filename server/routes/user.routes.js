const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    // todo: userId === current user id
    if (userId === req.user._id) {
      // console.log("body", req.body);
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

router.get("/", auth, async (req, res) => {
  try {
    const list = await User.find();

    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      massage: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/", auth, async (req, res) => {
  try {
    console.log("body", req.body);
    const id = await req.body._id;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).json({
      massage: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
module.exports = router;
