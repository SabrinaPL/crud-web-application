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

// Map HTTP verbs and route paths to controller action methods.
router.get('/', (req, res) => controller.index(req, res, next))

router.get('/register', (req, res) => controller.registration(req, res))
router.post('/register', (req, res) => controller.createRegistration(req, res))

router.get('/login', (req, res) => controller.index(req, res))
router.post('/login', (req, res) => controller.createLogin(req, res))