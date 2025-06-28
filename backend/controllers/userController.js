import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Message } from "../models/messageModel.js";

export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All Fields are Required !!" });
    }
    if (password != confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already Exits try different" });
    }

    // Password Hashing Techniqe
    const hashedPassword = await bcrypt.hash(password, 10);

    //Profile Photo
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    await User.create({
      fullName,
      username,
      password: hashedPassword,
      profilephoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });

    return res.status(201).json({
      message: "Account Created Successfuly !!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "All fiels require",
      });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found or Password",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "User Not Found or Password",
      });
    }
    const tokenData = {
      userId: user._id,
    };
    //Jwt
    const token = await jwt.sign(tokenData, process.env.JWT_SECRETE_KEY, {
      expiresIn: "1d",
    });
    // Token Cookie
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        _id: user._id,
        username: user.username,
        fullName: user.fullname,
        profilephoto: user.profilephoto,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout user",
    });
  } catch (error) {
    console.log(error);
  }
};
// 1 hour and 12min video i sharted here (req.id; line : 103) 4/13/2025
export const getOtherUser = async (req, res) => {
  try {
    const logedInUserId = req.id;
    const otherUsers = await User.find({ _id: { $ne: logedInUserId } }).select(
      "-password"
    );
    return res.status(200).json(otherUsers);
  } catch (error) {
    console.log(error);
  }
};
