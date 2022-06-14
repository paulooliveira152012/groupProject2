const router = require('express').Router();
const { Post, User } = require('../../models');

// get all users
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'post_url', 'title', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//create saved event 
router.post('/', (req, res) => {
    Post.create({
      name: req.body.name,
      address: req.body.address,
      date_of_event: req.body.date_of_event,
      post_url: req.body.post_url,
      user_id: req.session.userId
    })
      .then(() => res.status(200).json({ sucess: true }))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;