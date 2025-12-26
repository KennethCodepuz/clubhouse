const { body, validationResult, matchedData} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findByUsername } = require('../db/queries.js');

const validation = [
  body('firstname')
    .trim()
    .notEmpty().withMessage('First name is required.')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be 2-50 characters.')
    .matches(/^[a-zA-Z\s'-]+$/).withMessage('First name can only contain letters, spaces, hyphens, and apostrophes'),
  body('lastname')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be 2-50 characters.')
    .matches(/^[a-zA-Z\s'-]+$/).withMessage('Last name can only contain letters, spaces, hyphens, and apostrophes'),
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 5, max: 20 }).withMessage('Username must be 5-20 characters.')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores')
    .custom(async(value) => {

      const user = await findByUsername(value);
      if(user.length > 0) {
        throw new Error('Username already exist!');
      }
    }),
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 8, max: 128 }).withMessage('Password must be 8-128 characters.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  body('confirmPassword')
    .trim()
    .notEmpty().withMessage('Please confirm your password.')
    .custom((value, {req}) => {
      if(value !== req.body.password) {
        throw new Error('Passwords do not match!');
      }
      return true;
    }),
  body('role')
  .trim()
  .isIn(['user', 'admin']).withMessage('Invalid role'),
]

// Max expiry age for token
const MAXAGE = 1 * 24 * 60 * 60;
function createToken(id) {
  return jwt.sign({ id }, 'mysecretkey', { expiresIn: MAXAGE });
}

function handleErrors(errors) {

  const formatErrors = []

  errors.forEach(err => {
    formatErrors.push({ path: err.path, msg: err.msg});
  })

  return formatErrors;
}

const signupGet = async (req, res) => {
  res.render('signup')
}

const loginGet = async (req, res) => {
  res.render('login')
}


const signupPost = [...validation, async (req, res) => {

  const result = validationResult(req);
  
  if(!result.isEmpty()) {
    return res.send({ errors: handleErrors(result.array()) });
  }
  const { firstname, lastname, username, password, role } = req.body;

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const user = await createUser(firstname, lastname, username, hashedPassword, role);
    const token = createToken(user.id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: MAXAGE * 1000});
    res.status(201).json({user: { userID: user.id, firstname: user.firstname, lastname: user.lastname, username: user.username }});
  }catch(err) {
    res.status(400).json({ err });
  }
  
}]


const loginPost = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findByUsername(username);
    if(user.length !== 0) {
      const auth = await bcrypt.compare(password, user[0].password);
      if(auth) {
        const token = createToken(user[0].id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: MAXAGE * 1000 });
        res.status(201).json({ user: user }); 
      }
      throw new Error('Invalid Credentials!')
    }
    throw new Error('Invalid Credentials!')
  }catch(err) {
    res.status(404).json({ error: [err.message]});
  }
}

const logoutPost = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1});
  res.redirect('/');
}

module.exports = {
  signupGet,
  loginGet,
  signupPost,
  loginPost,
  logoutPost
}