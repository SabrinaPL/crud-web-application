/**
 * @file Defines the User model.
 * @module UserModel
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 */

// Model that will define how user information is stored in the database.
import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    }
})

schema.add(BASE_SCHEMA)

// Create a model using the schema.
export const UserModel = mongoose.model('User', schema)