import User from '../model/user.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const secretKey = process.env.SECRET_KEY

const middleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Auth Header Missing" })
    }
    const token = authHeader.split(" ")[1];


    if (!token) {
      return res.status(401).json({ success: false, message: "Invalid or Missing Token" });
    }
    if (!secretKey) {
      return res.status(401).json({ success: false, message: "Secret key not imported from env or Wrong Secret key" })
    }
    const decode = jwt.verify(token, secretKey)

    const user = await User.findById(decode.userId)
    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found " })
    }

    req.user = { email: user.email, name: user.name, id: user._id }

    next()

  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invailid Token" })
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Token Expired" })
    } else {
      return res.status(500).json({ success: false, message: "Error in Middleware" })
    }
  }
}
export default middleware;