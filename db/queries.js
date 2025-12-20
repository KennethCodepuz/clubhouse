const pool = require('./pool.js');

const createUser = async(firstname, lastname, username, password, role) => {
  const { rows } = await pool.query('INSERT INTO users(firstname, lastname, username, password, role) VALUES($1, $2, $3, $4, $5) RETURNING *', [firstname, lastname, username, password, role]);
  return rows[0];
}

const findByUsername = async(username) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE username ILIKE $1', [username]);
  return rows;
}

const findByID = async(id) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows;
}

const insertMembershipForUser = async (id, group) => {
  const { rows } = await pool.query('UPDATE users SET membership = membership || $1 WHERE id = $2 RETURNING *', [[group], id]);  // $1 must be an array
  return rows;
}

// query for getting all the groups
const getAllGroupNames = async () => {
  const { rows } = await pool.query('SELECT name FROM groups');
  return rows;
}


// POST CRUD OPERATIONS
const createPostQuery = async (userId, groupName, post) => {
  const { rows } = await pool.query('INSERT INTO posts(user_id, group_name, content) VALUES($1, $2, $3) RETURNING *',[userId, groupName, post]);
  return rows;
}

const updatePost = async () => {

}

const getAllPostByGroup = async (group) => {
  const { rows } = await pool.query('SELECT p.id, p.content, p.created_at, u.firstname, u.lastname FROM posts p JOIN users u ON p.user_id = u.id WHERE p.group_name ILIKE $1', [group]);
  return rows;s
}

const deletePost = async () => {

}

module.exports = {
  createUser,
  findByUsername,
  findByID,
  insertMembershipForUser,
  createPostQuery,
  updatePost,
  getAllPostByGroup,
  deletePost,
  getAllGroupNames
}