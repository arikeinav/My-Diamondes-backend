const logger = require('../services/logger.service')
const session = require('express-session')

async function requireAuth(req, res, next) {
  // req.session.user=session.user
  if (!req.session || !req.session.user ) {
    res.status(401).end('Unauthorized!');
    return;
  }
  next();
}

async function requireAdmin(req, res, next) {
  //  req.session.user=session.user
  if (!req.session.user ||!req.session.user.isAdmin) {
    res.status(403).end('Unauthorized Enough..');
    return;
  }
  next();
}


// module.exports = requireAuth;

module.exports = {
  requireAuth,
  requireAdmin
}
