import bcrypt from 'bcrypt'
import USER from '../model/user.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, Email and Pssword are required" })
    }
    const existingUser = await USER.findOne({ email: email })

    if (existingUser) {
      return res.status(400).json({ success: false, message: "User Alredy registerd" })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new USER({
      name,
      email,
      password: hashPassword
    })
    await newUser.save()
    return res.status(201).json({ success: true, message: "User registerd Successfully" })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error registering user', error });
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and Password are required" });
    }

    const existingUser = await USER.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User not registered" });
    }

    const verifyPassword = await bcrypt.compare(password, existingUser.password);
    if (!verifyPassword) {
      return res.status(401).json({ success: false, message: "Incorrect Password" });
    }

    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      token,
      message: "Login successful",
      userData: { name: existingUser.name, email: existingUser.email },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error logging in", error: error.message });
  }
};

export const verifyUser = async (req, res) => {
  return res.status(200).json({ success: true, message: "User verified successfully", user: req.user })
}
