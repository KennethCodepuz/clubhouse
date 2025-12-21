
const { getAllGroupNames, getAllPostByGroup, createPostQuery } = require("../db/queries");


const groupGetPosts = async (req, res) => {
  const {group} = req.params;

  const groups = await getAllGroupNames();
  const groupNames = groups.map(group => group.name).map(grup => grup.replace(/\s+/g, '-'));

  console.log(group);
  
  if(!groupNames.includes(group)) {
    return res.render('404');
  }

  try {
    const data = await getAllPostByGroup(group);
    const formatData = data === undefined ? [] : data;
    return res.render(`group-page`, { groupName: group, contents: formatData });
  }catch (err) {
    console.log(err);
  }
  
}

const createPost = async (req, res) => {
  const { post } = req.body;
  const { group } = req.params;
  const user = res.locals.user;

  try {
    const result = await createPostQuery(user.id, group, post);
    return res.redirect(`/group/${group}`);
  }catch (err) {
    console.log(err);
  }

}

module.exports = {
  groupGetPosts,
  createPost
}