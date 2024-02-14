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
        timestamps: true,
        versionKey: false
})

userSchema.add(BASE_SCHEMA)

// Pre hook to hash and salt the password before saving it to the database.
userSchema.pre('save', async function () {
    this.password = await bcryptjs.hash(this.password, 10)
})

// Method to authenticate a user.
userSchema.statics.authenticate = async function (username, password) {
    const user = await this.findOne({ username: username })
0
if (!user || !(await bcryptjs.compare(password, user.password))) {
    throw new Error('Invalid login attempt.')
}
    // If the user is found and the password is correct, return the user.
    return user
}


// Create a model using the schema.
export const UserModel = mongoose.model('User', userSchema)
