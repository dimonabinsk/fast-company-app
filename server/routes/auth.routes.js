const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");
const { generateUserData } = require("../utils/helpers");
const tokenService = require("../services/token.service");

// /api/auth/signUp
// 1. get data from req (email, password, sex, profession, quality[], name)
// 2. check is users already exists
// 3. hash password
// 4. create user
// 5. generate tokens

const signUpValidations = [
  check("email").isEmail().withMessage("Некорректный email"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Минимальная длина пароля 8 символов")
    .matches(/\d/)
    .withMessage("Пароль должен содержать число"),
];
router.post("/signUp", ...signUpValidations, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: "INVALID_DATA",
          code: 400,
          errors: errors.array(),
        },
      });
    }
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: {
          message: "EMAIL_EXISTS",
          code: 400,
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      ...generateUserData(),
      ...req.body,
      password: hashedPassword,
    });

    const tokens = tokenService.generate({
      _id: newUser._id,
    });
    await tokenService.save(newUser._id, tokens.refreshToken);

    res.status(201).send({
      ...tokens,
      userId: newUser._id,
    });
  } catch (error) {
    res.status(500).json({
      massage: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

// /api/auth/signInWithPassword
router.post("/signInWithPassword", async (req, res) => {});

// /api/auth/token
router.post("/token", async (req, res) => {});

module.exports = router;
