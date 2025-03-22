// Create web server// import express
const express = require('express');
// import body-parser
const bodyParser = require('body-parser');
// import comments
const comments = require('./comments');
// create express app
const app = express();
// use body-parser
app.use(bodyParser.json());
// create a route that returns all comments
app.get('/comments', (req, res) => {
  res.status(200).json(comments);
});
// create a route that returns a single comment
app.get('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const comment = comments.find(comment => comment.id === id);
  if (comment) {
    res.status(200).json(comment);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});
// create a route that creates a new comment
app.post('/comments', (req, res) => {
  const { body } = req;
  if (body.name && body.comment) {
    const newComment = {
      id: comments.length + 1,
      name: body.name,
      comment: body.comment
    };
    comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    res.status(400).json({ message: 'Invalid comment' });
  }
});
// create a route that updates a comment
app.put('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const comment = comments.find(comment => comment.id === id);
  const { body } = req;
  if (comment && body.name && body.comment) {
    comment.name = body.name;
    comment.comment = body.comment;
    res.status(200).json(comment);
  } else {
    res.status(400).json({ message: 'Invalid comment' });
  }
});
// create a route that deletes a comment
app.delete('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = comments.findIndex(comment => comment.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});
// start the server
app.listen(3000, () => {
  console.log('