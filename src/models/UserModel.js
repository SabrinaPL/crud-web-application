/**
 * @file Defines the User model.
 * @module UserModel
 * @author Sabrina Prichard-Lybeck <sp223kz@student.lnu.se>
 */

// Model that will define how user information is stored in the database.
import mongoose from 'mongoose'
import { BASE_SCHEMA } from './baseSchema.js'
import bcryptjs from 'bcryptjs'

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: [10, 'The password must be of minimum length 10 characters.'],
        required: true,
    }
    }, {
        timeStamps: true,
        versionKey: false
})

schema.add(BASE_SCHEMA)

// Pre hook to hash and salt the password before saving it to the database.
schema.pre('save', async function () {
    this.password = await bcryptjs.hash(this.password, 10)
})

// Encrypt?

// Create a model using the schema.
export const UserModel = mongoose.model('User', schema)