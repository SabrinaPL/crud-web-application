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
router.get('/', (req, res, next) => controller.index(req, res, next))

router.get('/register', (req, res, next) => controller.registration(req, res, next))
router.post('/register', (req, res, next) => controller.createRegistration(req, res, next))

router.get('/login', (req, res, next) => controller.login(req, res, next))
router.post('/login', (req, res, next) => controller.createLogin(req, res, next))

// Route for authenticating users.
// router.get('/login', (req, res, next) => controller.authenticateUser(req, res, next))

// Route for authorizing users.
// router.get('/login', (req, res, next) => controller.authorizeUser(req, res, next))

// Route for logging out.
// router.get('/logout', (req, res, next) => controller.logout(req, res, next))
