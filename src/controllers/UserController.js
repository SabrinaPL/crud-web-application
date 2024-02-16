/**
 * @file Defines the UserController class.
 * @module UserController
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 */

// I want this controller to handle the logic for user registration and login.
import { SnippetModel } from '../models/SnippetModel.js'
import { UserModel } from '../models/UserModel.js'

/**
 * Encapsulates a controller.
 */
export class UserController {
  /**
   * Renders a view and sends the rendered HTML string as an HTTP response.
   * index GET.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  index (req, res, next) {
    res.render('users/login')

    next()
  }

  /**
   * Returns a HTML form for registering a new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async registration (req, res) {
    res.render('users/register')
  }

  // Method for registration
  /**
   * Registers a new user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @returns {*} - Redirects to the login page if the user is successfully registered.
   */
  async createRegistration (req, res) {
    // Check if there is already a user in the database with that username, before new user can be created.

    const username = req.body.username
    const password = req.body.password
    const password2 = req.body.password2

    // Check if the passwords match, before the user can be registered.
    if (password !== password2) {
      req.session.flash = { type: 'danger', text: 'Passwords do not match.' }
      return res.redirect('./register')
    }

    // Check if the username and password is in the request body.
    if (!username || !password) {
      req.session.flash = { type: 'danger', text: 'Please enter a valid username and password.' }
      return res.redirect('./register')
    }

    // Check if the username already exists against the stored usernames in the database.
    const userInDatabase = await UserModel.findOne({ username })

    if (userInDatabase) {
      req.session.flash = { type: 'danger', text: 'Please enter a different username.' }
      return res.redirect('./register')
    }

    try {
      // Store user in the database.
      await UserModel.create({
        username,
        password
      })

      req.session.flash = { type: 'success', text: 'User registration was successfully completed.' }

      res.redirect('./login')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      return res.redirect('./register')
    }
  }

  // Connect user to snippets that the user has created. Only the user (if logged in) will be authorized to update or delete their own snippets.

  /**
   * Returns a HTML form for logging in.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   */
  async login (req, res) {
    res.render('users/login')
  }

  /**
   * Login the user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {*} - Redirects to the home page if the user is logged in.
   */
  async createLogin (req, res, next) {
    const username = req.body.username
    const password = req.body.password

    try {
      // Check if the user already exists against the stored usernames in the database.
      const userInDatabase = await UserModel.authenticate(username, password)
      // Session regeneration improves security (ex session fixation attacks and session hijacking).
      req.session.regenerate(() => {
        req.session.flash = { type: 'success', text: 'You are now logged in.' }
        req.session.user = userInDatabase
        return res.redirect('/')
      })
      next()
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      return res.redirect('./login')
    }
  }

  /**
   * Method to check if user is authenticated.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {*} - Redirects to 404 page if user is not authenticated.
   */
  static authenticateUser (req, res, next) {
    console.log('Hello from authenticateUser')
    if (!req.session.user) {
      return res.redirect('errors/404.html')
    }
    next()
  }

  /**
   * Method for user authorization.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {*} - Redirects to 403 page if user is not authorized.
   */
  /* static authorizeUser (req, res, next) {
    console.log('Hello from authorizeUser')
    if (SnippetModel.user !== req.session.user) {
      return res.redirect('errors/403.html')
    }
    next()
  } */
}
