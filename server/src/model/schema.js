require('../../config.js');
const pgp = require('pg-promise')();
const db = pgp(process.env.DB_URL);

const schemaSql = `
    -- Extensions
    CREATE EXTENSION IF NOT EXISTS pg_trgm;

    -- Drop (droppable only when no dependency)
    DROP INDEX IF EXISTS posts_idx_text;
    DROP INDEX IF EXISTS posts_idx_ts;
    DROP TABLE IF EXISTS posts;

    -- Create
    CREATE TABLE posts (
        id                serial PRIMARY KEY NOT NULL,
        "c_text"          text NOT NULL,
        ts                bigint NOT NULL DEFAULT (extract(epoch from now())),
        "count"           integer NOT NULL DEFAULT 1,
        "username"        text NOT NULL
    );
    CREATE INDEX posts_idx_ts ON posts USING btree(ts);
    CREATE INDEX posts_idx_text ON posts USING gin(username gin_trgm_ops);
`;

db.none(schemaSql)
  .then(() => {
    console.log('Schema created');
  })
  .catch((err) => {
    console.log('Error creating schema', err);
  });
