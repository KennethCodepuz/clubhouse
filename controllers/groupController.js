
const valorantGet = (req, res) => {
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