const jwt = require('jsonwebtoken');
const { findByID } = require('../db/queries.js');


// Check if user is Authorized
const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  if(token) {
    jwt.verify(token, 'mysecretkey', (error, decodedToken) => {
      if(error) {
        console.log(error);
        res.redirect('/login');
      }else {
        console.log(decodedToken);
        next();
      }
    })
  }else {
    res.redirect('/login');
  }

}

// Check if User exist on Database
// res.locals.user stores authenticated users
const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if(token) {
    // Verify token 
    try {
      const decodedToken = await jwt.verify(token, 'mysecretkey');
      const user = await findByID(decodedToken.id);
      res.locals.user = user[0];
      next();
    } catch(error) {
      console.log('JWT Error:', error.message);
      res.locals.user = null;
      next();
    }
  }else {
    res.locals.user = null;
    next();
  }
}

module.exports = {
  requireAuth,
  checkUser
}