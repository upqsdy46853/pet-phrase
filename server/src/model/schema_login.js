require('../../config.js');
const pgp = require('pg-promise')();
const db = pgp(process.env.DB_URL);

const schemaSql = `
    -- Extensions
    CREATE EXTENSION IF NOT EXISTS pg_trgm;

    -- Drop (droppable only when no dependency)
    DROP INDEX IF EXISTS users_idx_text;
    DROP INDEX IF EXISTS users_idx_ts;
    DROP TABLE IF EXISTS users;

    -- Create
    CREATE TABLE users (
        id                serial PRIMARY KEY NOT NULL,
        ts                bigint NOT NULL DEFAULT (extract(epoch from now())),
        "username"        text NOT NULL,
        "password"        text NOT NULL
    );
    CREATE INDEX users_idx_ts ON users USING btree(ts);
    CREATE INDEX users_idx_text ON users USING gin(username gin_trgm_ops);
`;

db.none(schemaSql)
  .then(() => {
    console.log('Schema created');
  })
  .catch((err) => {
    console.log('Error creating schema', err);
  });

