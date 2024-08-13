import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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

      const token = jwt.sign({ username: user.username, id: user._id }, process.env.KEY, {
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

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.json({ message: "User with this email was not found" });
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });

    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_HOST_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL_HOST_USER,
      to: user.email,
      subject: "Reset password",
      text: `http://localhost:5173/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.json({
          status: true,
          message: "Email sent, check your email",
        });
      }
    });
  } catch (error) {
    console.error("Error in forgot-password route:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const decode = await jwt.verify(token, process.env.KEY);
    const id = decode.id;
    await User.findByIdAndUpdate({_id: id}, {password: hashPassword});
    return res.json({status: true, message: "Password updated successfully"});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.put("/update-user/:token", async (req, res) => {
  const { token } = req.params;
  const { firstName, lastName} = req.body;

  try {

    
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

export { router as UserRouter };
