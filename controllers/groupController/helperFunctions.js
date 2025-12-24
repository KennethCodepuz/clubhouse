function normalizeName(name) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

function formatData(posts, isMember) {
  if(!isMember) {
    return posts.map(item => ({...item, firstname: 'anonymous', lastname: 'anonymous' }));
  }else {
    return posts === undefined ? [] : posts;
  }
}

module.exports = {
  normalizeName,
  formatData
}