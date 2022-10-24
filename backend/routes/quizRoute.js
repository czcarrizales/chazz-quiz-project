const express = require('express');
const mongoose = require('mongoose')
const Answer = require('../models/answerModel');
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

router.route('/quizzes/:_id').get((req, res) => {
  const id = req.params._id
  Quiz.findById(id).populate('answers')
    .then(quiz => res.json(quiz))
    .catch(err => res.json('error: ' + err))
})

router.route('/create').post((req, res) => {
  console.log(req.body)
  const newQuiz = new Quiz({
    title: req.body.title,
    question: req.body.question,
    answers: req.body.answers
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

router.route('/createanswer').post( async (req, res) => {
  const newAnswer = new Answer({
    _id: new mongoose.Types.ObjectId(),
    quiz: req.body.quiz,
    answer: req.body.answer,
    correct: req.body.correct
  })

  Quiz.findByIdAndUpdate('635485971bb91df611922133', {$push:{answers: {_id: newAnswer._id}}}, (error, data) => {if(error){console.log(error)}else(console.log(data))})

  

  await newAnswer.save()
    .then(result => {
      const newQuiz = new Quiz({
        title: 'test',
    question: 'test',
    answers: newAnswer._id
      })
      res.status(200).json(result)
    })
    .catch(err => {
      res.json({err: 'Answer creation error'})
    })
    console.log(newAnswer)
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