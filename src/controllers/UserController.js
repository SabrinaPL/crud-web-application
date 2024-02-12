/**
 * @file Defines the UserController class.
 * @module UserController
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 */

// I want this controller to handle the logic for user registration and login.
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
   */
    async createRegistration (req, res, next) {
      // Check if there is already a user in the database with that username, before new user can be created.

      const username = req.body.username
      const password = req.body.password

      // Check if the username and password is in the request body.
      if (!username || !password) {
        req.session.flash = { type: 'danger', text: 'Please enter a valid username and password.' }
        return res.redirect('./registration')
      } 

      // Check if the username already exists against the stored usernames in the database.
      const userInDatabase = await UserModel.findOne({username: username})

      if (userInDatabase) {
        req.session.flash = { type: 'danger', text: 'Please enter a different username.'}
        return res.redirect('./registration')
      }

      // Next step is to hash and salt the password, before storing the new user in the database.
    }
}