function normalizeName(name) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

function formatData(posts, isMember) {
  if(!isMember) {
    return {posts: posts.map(item => ({...item, firstname: 'anonymous', lastname: 'anonymous' })), member: 'isNotMember'};
  }else {
    console.log(posts);
    return posts === undefined ? {posts: [], member: 'isMember'} : {posts: posts, member: 'isMember'};
  }
}

module.exports = {
  normalizeName,
  formatData
}