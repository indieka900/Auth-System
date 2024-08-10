import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //const user = await User.findOne({ email });
    // if (user) {
    //   return res.json({ message: "User with this email already exists" });
    // }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();
    return res
      .status(201)
      .json({ status: true, message: "Register successfully", user: newUser });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const user = await User.findOne({ email });

      const validpass = await bcrypt.compare(password, user.password);
      if (!validpass) {
        return res.status(400).json({ message: "Password is incorrect" });
      }

      const token = jwt.sign({ username: user.username }, process.env.KEY, {
        expiresIn: "1h",
      });
      res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
      return res
        .status(200)
        .json({ status: true, token: token, message: "login successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "Password and Email field(s) are required" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

export { router as UserRouter };
