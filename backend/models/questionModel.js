const mongoose = require('mongoose')
const {Schema} = mongoose;

const questionSchema = new Schema({
    quiz: {type: Schema.Types.ObjectId, ref: 'Quiz'},
    answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
    question: String
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question;