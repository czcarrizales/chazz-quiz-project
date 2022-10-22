const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
    title: String
})

const Quiz = mongoose.model('Quiz', quizSchema)

module.exports = Quiz;