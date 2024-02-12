/**
 * @file Defines the user router.
 * @module userRouter
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 */

// Routes for user registration and login.
import express from 'express'
import { UserController } from '../controllers/UserController.js'

export const router = express.Router()

const controller = new UserController()