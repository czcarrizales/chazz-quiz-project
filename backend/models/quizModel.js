const mongoose = require('mongoose')
const {Schema} = mongoose;

const quizSchema = new Schema({
    title: String,
    questions: [{type: Schema.Types.ObjectId, ref: 'Question'}]
})

const Quiz = mongoose.model('Quiz', quizSchema)

module.exports = Quiz;