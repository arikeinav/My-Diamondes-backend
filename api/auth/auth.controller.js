const authService = require('./auth.service')
const logger = require('../../services/logger.service')
const session = require('express-session')

async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        req.session.user = user
        // session.user = user;
        // if (session.user.isBlocked) res.status(401).end('blocked!!!!')
        res.json(user)
    } catch (err) {
        res.status(401).send({ error: err })
    }
}
function checkIfUser(req,res){
    user=req.session.user
    if (user) res.json(user)
}

async function signup(req, res) {
    try {
        const { username, password } = req.body
        logger.debug( username + ', ' + password)
        const account = await authService.signup(username, password)
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const user = await authService.login(username, password)
        req.session.user = user
        // session.user = user
        res.json(user)
    } catch (err) {
        logger.error('[SIGNUP] ' + err)
        res.status(500).send({ error: 'could not signup, please try later' })
    }
}

async function logout(req, res){
    try {
        req.session.destroy()
        //  session.user={}
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

module.exports = {
    login,
    signup,
    logout,
    checkIfUser
}