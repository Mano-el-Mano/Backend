const users = require('../logic/users')

/**
 *
 * @param {string} userId
 */
const getUser = async userId => {
    return await users.getUser(userId)
}
export { getUser }
