/**
 * @file Defines the router class.
 * @module router
 * @author Mats Loock
 */

import express from 'express'
import http from 'node:http'
import { router as homeRouter } from './homeRouter.js'
import { router as snippetRouter } from './snippetRouter.js'
import { router as userRouter } from './userRouter.js'

export const router = express.Router()

// Router object is used as argument.
router.use('/', homeRouter)
router.use('/snippets', snippetRouter)
router.use('/users', userRouter)

// Catch 404 and forward to error handler.
router.use('*', (req, res, next) => {
    const statusCode = 404
    const error = new Error(http.STATUS_CODES[statusCode])
    error.status = statusCode
    next(error)
})