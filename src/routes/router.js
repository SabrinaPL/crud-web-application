/**
 * @file Defines the router class.
 * @module router
 * @author Mats Loock
 */

import express from 'express'
import { router as homeRouter } from './homeRouter.js'
import { router as snippetRouter } from './snippetRouter.js'

export const router = express.Router()

// Router object is used as argument.
router.use('/', homeRouter)
router.use('/snippets', snippetRouter)