const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../nuxt.config.js')

const secret = config.jwt.reduce((secret, jwt) => jwt.secret || secret, 'default')
const maxAge = config.jwt.reduce((ttl, jwt) => jwt.ttl || ttl, 3600)
const saltRounds = config.jwt.reduce((salts, jwt) => jwt.salts || salts, 10)

function createJWToken(user) {
  if (typeof user !== 'object') {
    user = {}
  }

  let token = jwt.sign({ data: user },
    new Buffer(secret, 'base64'), {
      expiresIn: maxAge,
      algorithm: 'HS256'
    })

  return token
}

function verifyJWTToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, new Buffer(secret, 'base64'), (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err)
      }

      resolve(decodedToken)
    })
  })
}

function verifyJWTMiddleware(req, res, next) {
  let token = req.headers['x-access-token']

  verifyJWTToken(token)
    .then((decodedToken) => {
      req.user = decodedToken.data
      next()
    })
    .catch((err) => {
      res.status(400).json({ message: 'Invalid x-access-token given' })
    })
}

function generatePasswordHash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err || !hash) {
        return reject(err)
      }

      resolve(hash)
    })
  })
}

function checkUserAuthentication(password, user) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return reject(err)
      }

      resolve(user)
    })
  })
}

module.exports = {
  createJWToken,
  verifyJWTToken,
  verifyJWTMiddleware,
  generatePasswordHash,
  checkUserAuthentication
}