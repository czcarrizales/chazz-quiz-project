const mongoose = require('mongoose')
const {Schema} = mongoose;

const quizSchema = new Schema({
    title: String,
    question: String,
    answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
})

const Quiz = mongoose.model('Quiz', quizSchema)

module.exports = Quiz;