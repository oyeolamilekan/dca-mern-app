const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants/auth.const");

const User = require("../models/user.model");

/**
 * The auth middleware makes sure all authenticated request are protected.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const protect = async (req, res, next) => {
    if (req.headers.authorization?.startsWith("Bearer")) {
        try {
            let token = req.headers.authorization.split(" ")[1]

            // verify token
            const decoded = jwt.verify(token, JWT_SECRET)

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password').select("-__v")
            if (req.user == null) {
                throw Error("User does not exit.")
            }
            next()
        } catch (error) {
            res.status(401).json({
                message: error.message
            })
        }
    }

    if (req.headers.authorization == null) {

        res.status(401).json({
            message: "Not Unauthoffrized"
        })
    }
}

module.exports = {
    protect
}