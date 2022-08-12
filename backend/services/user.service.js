const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants/auth.const");

/**
 * Generate jwt token authentication token
 * @param {string} id 
 * @returns {string}
 */
const generateJwtToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '30d' 
    })
}

/**
 * Generates random string to authenticate users
 * @param {int} length 
 * @returns {string}
 */
const generateId = (length) => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

module.exports = {
    generateJwtToken,
    generateId,
}