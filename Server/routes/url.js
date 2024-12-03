import express from 'express'
import { urlGenrate, handleRedirect, fetchAllUrl, urlDetails, handleDelete } from '../controller/urlController.js'
import middleware from '../middleware/middleware.js'

const router = express.Router()

// router.post('/addUrl', middleware, urlGenrate)
// router.delete('/delete/:id', middleware, handleDelete)
// router.get('/redirect/:id', handleRedirect)
// router.get('/fetchUrl', middleware, fetchAllUrl)
// router.get('/details/:id', urlDetails)
router.ger("/hello", (req, res) => {
  res.send("Hello from Url Route")
})

export default router