import express from 'express'
import cors from 'cors'
import connectToMongoDB from './db/db.js'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js'
//import urlRoutes from './routes/url.js'
dotenv.config()

const app = express()

// Database Connection
connectToMongoDB()

// Middleware 
app.use(cors({
  origin: ['http://localhost:5173', 'https://url-shortner-mern-app-frontend.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal Server Error', error: err.message });
// });

app.use(express.json())


//Routes
app.use('/api/auth/', authRoutes)
//app.use('/api/url/', urlRoutes)

app.get('/', (req, res) => {
  res.send('Hello from index')
})

app.listen(process.env.PORT, () => {
  console.log("Server Start Successfully")
})