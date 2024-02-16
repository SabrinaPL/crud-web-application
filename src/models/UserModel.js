/**
 * @file Defines the User model.
 * @module UserModel
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 */

// Model that will define how user information is stored in the database.
import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: [3, 'The username must be of minimum length 3 characters.'],
    maxLength: [256, 'The username must be of maximum length 256 characters.']
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: [10, 'The password must be of minimum length 10 characters.'],
    maxLength: [256, 'The password must be of maximum length 256 characters.']
  }
}, {
  timestamps: true,
  versionKey: false
})

userSchema.add(BASE_SCHEMA)

// Pre hook to hash and salt the password before saving it to the database. Added code to check if the password is modified, as recommended by Mats (handledning 15/2-2024).
userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 10)
  }
  next()
})

// Method to authenticate a user (from the "access control" lecture).
/**
 * Method to authenticate a user.
 *
 * @param {username} username of the user.
 * @param {password} password of the user.
 * @returns {Promise} The user.
 */
userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })

  if (!user || !(await bcryptjs.compare(password, user.password))) {
    throw new Error('Invalid login attempt.')
  }
  // If the user is found and the password is correct, return the user.
  return user
}

// Create a model using the schema.
export const UserModel = mongoose.model('User', userSchema)
