import express from 'express'
import { router as homeRouter } from './homeRouter.js'

export const router = express.Router()

// Router object is used as argument.
router.use('/', homeRouter)