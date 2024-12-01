import express from 'express'
import { registerUser, loginUser, verifyUser } from '../controller/authController.js'
import middleware from '../middleware/middleware.js'
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/verifyUser', verifyUser) //middleware

export default router

router.get('/', middleware, (req, res) => {
  res.send("hello from auth")
})
