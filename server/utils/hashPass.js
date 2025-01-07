const bcrypt = require('bcrypt');
const logger = require('../logger');

async function hashPassword(plainPassword) {
    let salt = 5;

    let hashed = await bcrypt.hash(plainPassword, salt)

    return hashed;
}

async function comparePassword(plainPassword, hashedPassword) {

    try {
        let match = await bcrypt.compare(plainPassword, hashedPassword)

        if (match) {
            logger.info('Password matches');
        }
        else {
            logger.warn('Incorrect password!')

        }

        return match;
    } catch (error) {
        logger.error('Error when comparing passwords!', error)
    }


}


module.exports = { hashPassword, comparePassword }