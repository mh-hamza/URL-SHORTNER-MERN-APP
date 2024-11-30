import express from 'express'
import cors from 'cors'
import connectToMongoDB from './db/db.js'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js'
// import urlRoutes from './routes/url.js'
dotenv.config()

const app = express()

// Database Connection
connectToMongoDB()

// Middleware 
app.use(cors())
app.use(express.json())
app.use(cors({
  origin: 'https://url-shortner-mern-app-frontend.vercel.app/', // Allow only requests from your frontend
}));

//Routes
app.use('/api/auth/', authRoutes)
// app.use('/api/url/', urlRoutes)

app.get('/', (req, res) => {
  res.send('Hello from index')
})

app.listen(process.env.PORT, () => {
  console.log("Server Start Successfully")
})