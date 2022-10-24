const mongoose = require('mongoose')
const {Schema} = mongoose;

const answerSchema = new Schema({
    question: {type: Schema.Types.ObjectId, ref: 'Question'},
    answer: String,
    correct: Boolean,
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer;