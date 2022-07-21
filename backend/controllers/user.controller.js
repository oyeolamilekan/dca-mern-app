const userModel = require("../models/user.model");
const authCode = require("../models/authCode.model");
const { encrypt } = require("../services/encryption.service");
const { generateJwtToken, generateId } = require("../services/user.service");
const Quidax = require("quidax-node");

// @dec     Register new user
// @route   Post /api/user/
// @access  Public
const syncUserAccount = async (req, res) => {
    try {
        const { key } = req.body;

        const quidax = new Quidax(key)

        const userInfo = await quidax.users.getAccountDetails("me")

        const encryptedApiKey = encrypt(key)

        const email = userInfo.data.email

        // check if user exists
        const userExists = await userModel.findOne({ email })

        if (userExists) {
            return res.status(401).json({
                message: "User exist."
            })
        }

        const user = await userModel.create({
            "encryptedApiKey": encryptedApiKey,
            "email": userInfo.data.email,
            "name": `${userInfo.data.first_name} ${userInfo.data.last_name}`
        })

        user.save()

        res.status(201).json({
            msg: "User account has been synced, kindly sign in with the email tethered the api key.",
        })

    } catch (error) {
        return res.json({ msg: "Error in sync: Server error." });
    }
}

const signinAccount = async (req, res) => {
    try {
        const { email } = req.body;

        const userExists = await userModel.findOne({ email })

        const code = generateId(5)

        if (userExists) {
            await authCode.updateOne({ _id: userExists.id }, { user: userExists, code, isUsed: false }, { upsert: true },)
            return res.status(200).json({
                message: "An otp code has been sent to your mail, kindly check it."
            })
        }
        return res.status(403).json({ msg: "This account does not exit." })

    } catch (error) {
        return res.json({ msg: "Error in sync: Server error." });
    }
}

const authenticateAccount = async (req, res) => {
    try {

        const { email, code } = req.body;

        const userExists = await userModel.findOne({ email })

        if (!userExists) {
            return res.status(403).json({
                message: "This account does not exit."
            })
        }

        const authCodeObj = await authCode.findOne({ user: userExists.id, code })

        if (authCodeObj.user.toString() === userExists.id && !authCodeObj.isUsed) {
            await authCode.findByIdAndUpdate(authCodeObj.id, { isUsed: true },);
            return res.status(200).json({
                data: {
                    message: "Welcome comrade.",
                    token: generateJwtToken(userExists.id),
                }
            })
        }

        return res.status(500).json({ msg: "Unauthorized attempt." });

    } catch (error) {
        return res.status(500).json({ msg: "Error in sync: Server error." });
    }
}



module.exports = {
    syncUserAccount,
    signinAccount,
    authenticateAccount
}