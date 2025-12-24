
const { getAllGroupNames, getAllPostByGroup, createPostQuery, findByID } = require("../../db/queries");
const { normalizeName, formatData } = require("./helperFunctions");


const groupGetPosts = async (req, res) => {
  const {group} = req.params;
  const user = res.locals.user;

  const groups = await getAllGroupNames();
  const groupNames = groups.map(group => normalizeName(group.name));
  
  if(!groupNames.includes(group)) {
    return res.render('404');
  }

  try {
    const data = await getAllPostByGroup(group);
    const userData = await findByID(user.id);
    const membership = userData[0].membership?.map(normalizeName) || [];
    
    const formattedData = formatData(data, membership.includes(group));
    
    return res.render(`group-page`, { groupName: group, contents: formattedData});

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