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

        const { email, first_name, last_name } = userInfo.data

        const user = await userModel.findOneOrCreate({
            "email": email,
        }, {
            "encryptedApiKey": encryptedApiKey,
            "email": email,
            "name": `${first_name} ${last_name}`
        })

        user.save()

        const code = generateId(5)

        await authCode.updateOne({ _id: user.id }, { user: user, code, isUsed: false }, { upsert: true },)

        res.status(201).json({
            msg: "User account has been synced, kindly sign in with the email tethered the api key.",
        })

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
    authenticateAccount
}