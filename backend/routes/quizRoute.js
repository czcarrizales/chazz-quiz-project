const express = require('express');
const { db } = require('../models/quizModel');
const app = express();

const router = express.Router();
const Quiz = require('../models/quizModel')
app.use(express.urlencoded({extended: true}));
app.use(express.json());

router.route('/').get((req, res) => {
  Quiz.find()
    .then(quiz => res.json(quiz))
    .catch(err => res.status(400).json('error: ' + err))
})

router.route('/create').post((req, res) => {
  console.log(req.body)
  const newQuiz = new Quiz({
    title: req.body.title
  })

  newQuiz.save()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.json({err: 'Quiz creation error'})
    })
    console.log(req.body)
})

router.route('/delete/:_id').delete(async (req, res) => {
  let data = await Quiz.deleteOne(req.params)
  res.send(data)
})

router.route('/update/:_id').patch(async(req, res) => {
  try {
    const id = req.params._id;
    const updates = req.body
    const options = {new: true}
  
    const result = await Quiz.findByIdAndUpdate(id, updates, options)
    res.send(result)
  } catch (err) {
    console.log(err.message)
  }
})



module.exports = router;