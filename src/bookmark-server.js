'use strict';

const express = require('express');
const uuid = require('uuid/v4');
const logger = require('./logger');
const {bookmarks} = require('./bookmarks');

const bookmarkRouter = express.Router();
const bodyParser = express.json();

bookmarkRouter
  .route('/bookmark')
  .get((req, res) => {
    res.json(bookmarks);
  })
  .post(bodyParser, (req, res) => {
    const { title, url, description, rating } = req.body;

    if (!title) {
      logger.error('Need valid input');
      return res
        .status(400)
        .send('Invalid data');
    }

    const bookmark = { id: uuid(), title, url, description, rating };
    console.log(bookmark);
    bookmarks.push(bookmark);

    logger.info(`Bookmark with id ${bookmark.id} created`);

    res
      .status(201)
      .location(`http://localhost:8000/bookmark/${bookmark.id}`)
      .json(bookmark);
  });


bookmarkRouter
  .route('/bookmark/:id')
  .get((req, res) => {
    // implment
  })
  .delete((req, res) => {
    // implment delete
  });


module.exports = bookmarkRouter;


