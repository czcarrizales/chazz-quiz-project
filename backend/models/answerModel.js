const mongoose = require('mongoose')
const {Schema} = mongoose;

const answerSchema = new Schema({
    _id: Schema.Types.ObjectId,
    quiz: {type: Schema.Types.ObjectId, ref: 'Quiz'},
    answer: String,
    correct: Boolean,
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer;