const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const postModel = require('../model/posts.js');

const router = express.Router();

router.use(express.json());
router.use(accessController); // Allows cross-origin HTTP requests

// List
router.get('/record', function (req, res, next) {
  const { username, start } = req.query;
  postModel
    .list(username, start)
    .then((posts) => {
      res.json(posts);
    })
    .catch(next);
});

// Create
router.post('/record', function (req, res, next) {
  const { username, c_text } = req.body;
  if (!username || !c_text) {
    const err = new Error('username and c_text are required');
    err.status = 400;
    throw err;
  }
  postModel
    .create(username, c_text)
    .then((post) => {
      res.json(post);
    })
    .catch(next);
});
// Revise
router.post('/revise/:id/:e_text', function (req, res, next) {
  const { id , e_text} = req.params;
    if (!id || !e_text) {
      const err = new Error('Post ID and e_text are required');
      err.status = 400;
      throw err;
    }
    postModel
      .revise(id,e_text)
      .then((post) => {
        res.json(post);
      })
      .catch(next);
});

// Delete
router.post('/delete/:id', function (req, res, next) {
  const { id } = req.params;
    if (!id) {
      const err = new Error('Post ID is required');
      err.status = 400;
      throw err;
    }
    postModel
      .Delete(id)
      .then((post) => {
        res.json(post);
      })
      .catch(next);
});


module.exports = router;
