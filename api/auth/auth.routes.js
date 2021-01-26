const express = require('express')
const {requireAuth}  = require('../../middlewares/requireAuth.middleware')
const {login, signup, logout,checkIfUser} = require('./auth.controller')

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)
router.post('/checkIfUser', checkIfUser)

module.exports = router