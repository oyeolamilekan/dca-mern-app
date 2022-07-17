const jwt = require("jsonwebtoken")

const User = require("../models/user.model");

const protect = async (req, res, next) => {

    if (req.headers.authorization?.startsWith("Bearer")) {
        try {
            let token = req.headers.authorization.split(" ")[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password').select("-__v")
            next()
        } catch (error) {
            res.status(401).json({
                message: "Not Unauthcorized"
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