const { insertMembershipForUser, findByID } = require("../db/queries");


const membershipGet = (req, res) => {
  res.render('membership', { err: '', group: ''});
}

const membershipPost = async (req, res) => {
  const groupCodes = {
    'League of Legends': 'fakergoat',
    'Valorant': 'tenzgoat',
    'Genshin Impact': 'traveller',
  }
  const user = res.locals.user;
  const { code, group }= req.body;

  try {
    const userData = await findByID(user.id);

    if(!userData[0].membership) {
      for(const [key, secret] of Object.entries(groupCodes)) {
        if(key === group && secret === code) {
          await insertMembershipForUser(user.id, group);
          return res.redirect('/');
        }
      }
    }

    if(userData[0].membership.includes(group)) {
      throw new Error('Already in the group.');
    }

    for(const [key, secret] of Object.entries(groupCodes)) {
      if(key === group && secret === code) {
        await insertMembershipForUser(user.id, group);
        return res.redirect('/');
      }
    }

    throw new Error('Invalid Code.');
  }catch(err) {
    res.status(404).render('membership', { err: [err.message], group });
  }
}

module.exports = {
  membershipGet,
  membershipPost
}