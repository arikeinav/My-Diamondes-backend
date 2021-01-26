const bcrypt = require('bcryptjs')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

async function login(username, password) {
    
    if (! username || !password) return Promise.reject('username and password are required!')

    const user = await userService.getByUsername(username)
    if (!user) return Promise.reject('Invalid')
    if (user.isBlocked) return Promise.reject('blocked')
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid')

    delete user.password;
    return user;
}

async function signup(username, password) {
    logger.debug(`auth.service - username: ${username}`)
    if (!username || !password ) return Promise.reject(' username and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({username, password: hash ,isAdmin:false,isBlocked:false})
}

module.exports = {
    signup,
    login,
}