if (!global.db) {
  const pgp = require('pg-promise')(); db = pgp(process.env.DB_URL); }

function create(username, password) {
        const sql = `
        INSERT INTO users ($<this:name>)
        VALUES ($<username>,$<password>)
        RETURNING *;
        `;
        return db.one(sql, { username, password });
};


function correct(username, password) {
  const sql = `
  SELECT EXISTS(SELECT 1 FROM users WHERE username = $<username> AND password = $<password>);
  `;
  return db.one(sql, { username, password });
}

function exist(username) {
  const sql = `
    SELECT EXISTS(SELECT FROM users WHERE username = $<username>);
  `;
  return db.one(sql, {username});
}

module.exports = {
  create,
  exist,
  correct
};
