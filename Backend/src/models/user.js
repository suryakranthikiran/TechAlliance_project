const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 30,
        trim: true,
        index: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid: " + value);
            }
        },
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a strong password.");
            }
        },
    },
    age: {
        type: Number,
        min: 18,
        default: 18,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other", "default"],
        lowercase: true,
        trim: true,
        default: "default",
    },
    photoUrl: {
        type: String,
        trim: true,
        default: "https://dummyimage.com/400x400/ccc/000.jpg&text=No+Photo",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Photo URL is not valid.");
            }
        },
    },
    about: {
        type: String,
        trim: true,
        default: "Default About",
    },
    skills: {
        type: [String],
        default: [],
    },
}, { timestamps: true });

// Instance methods
userSchema.methods.getJWT = function () {
    return jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
    });
};

userSchema.methods.validatePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
