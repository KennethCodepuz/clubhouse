const express = require('express');
const path = require('path');
const cookierParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes.js');
const membershipRoutes = require('./routes/membershipRoutes.js');
const groupRoutes = require('./routes/groupRoutes.js');
const { checkUser, requireAuth } = require('./middleware/authMiddleware.js');
const { findByID } = require('./db/queries.js');
require('dotenv').config();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
app.use(cookierParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(membershipRoutes);
app.use(groupRoutes);
app.use(checkUser);

app.get('/', checkUser, requireAuth, async (req, res) => {
  const user = res.locals.user;

  try {
    const userData = await findByID(user.id)
    if(!userData) {
      return res.render('index');
    }
    return res.render('index', { memberships: userData[0].membership ? userData[0].membership : [], component: 'placeholder' });
  }catch(err) {
    console.log(err.message);
  }
});

const PORT = process.env.port || 3000;
const HOST = process.env.host || 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`App is running on ${HOST} at port ${PORT}`);
})