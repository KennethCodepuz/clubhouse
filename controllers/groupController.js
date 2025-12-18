

const valorantGet = (req, res) => {
  const user = res.locals.user;

  console.log(user);
  res.render('valorantFeed');
}

const leagueGet = (req, res) => {
  res.render('leagueFeed');
}

const genshinGet = (req, res) => {
  res.render('genshinFeed');
}

module.exports = {
  valorantGet,
  leagueGet,
  genshinGet
}