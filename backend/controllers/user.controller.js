import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
// Creating Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
// Login User
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Checking if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: "false",
        message: "User does not exist",
      });
    }
    // Checking for correct password
    const isPassMatch = await bcrypt.compare(password, user.password);
    if (isPassMatch === false) {
      return res.json({ success: false,message: "Invalid Password" });
    }
    // Creating Token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log("Error in login : ", error);
    res.json({ success: false, message: "Error occured in Login" });
  }
};
// Sign Up user
const userRegister = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // Checking if user already exits
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res
        .json({ success: false, message: "User already exits" })
        .status(401);
    }

    // Validating email format and Strong Password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a valid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please provide a strong password",
      });
    }

    // Hashing the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = bcrypt.hashSync(password, salt);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPass,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log("Some error ocurred while creating the user.", error);
    res.json({ success: false, message: "Error occured in signup." });
  }
};

export { userLogin, userRegister };
