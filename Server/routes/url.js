import express from 'express'
import { urlGenrate, handleRedirect, fetchAllUrl, urlDetails, handleDelete } from '../controller/urlController.js'
import middleware from '../middleware/middleware.js'

const router = express.Router()



router.get('/', (req, res) => {
  res.send("hello from Url")
})

export default router