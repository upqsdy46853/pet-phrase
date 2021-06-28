const translateModel = require('./translate.js');

if (!global.db) {
  const pgp = require('pg-promise')();
  db = pgp(process.env.DB_URL);
}

function list(username = '', start) {
  const where = [];
  if (username) where.push(`username ILIKE '%$1:value%'`); if (start) where.push('id < $2');
  const sql = `
        SELECT *
        FROM posts
        ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
        ORDER BY count DESC
    `;
    //LIMIT 10
  return db.any(sql, [username, start]);
}

async function create(username, c_text) {
  var find;
  var sql;
  await translateModel.translateText(c_text).then(
    (data)=>{
    str = {...data};
    e_text = str[0];
  })
  return exist(username, c_text).then((data) => {
      arr = { ...data };
      find = arr.exists;
      if (find) {
        sql = `
        UPDATE posts
        SET count = count + 1
        WHERE username = $<username> AND c_text = $<c_text>
        RETURNING *
        `;
      }
      else {
        sql = `
        INSERT INTO posts ($<this:name>)
        VALUES ($<username>,$<c_text> ,$<e_text>)
        RETURNING *
        `;
      }
      return db.one(sql, { username, c_text, e_text });
    }
  );
}
function revise(id,e_text){
  const sql = `
        UPDATE posts
        SET e_text = $<e_text>
        WHERE id = $<id>
        RETURNING *;
        `;
  return db.one(sql, { id, e_text });
}

function Delete(id){
  const sql = `
        DELETE FROM posts WHERE id = $<id>
        RETURNING *
        `;
  return db.one(sql, { id });
}

function exist(username, c_text) {
  const sql = `
  SELECT EXISTS(SELECT 1 FROM POSTS WHERE username = $<username> AND c_text = $<c_text>);
  `;
  return db.one(sql, { username, c_text });
}

module.exports = {
  list,
  create,
  revise,
  Delete,
};
