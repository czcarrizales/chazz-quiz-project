import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateTitle from "./CreateTitle";
import CreateQuestion from "./CreateQuestion";
import CreateAnswer from "./CreateAnswer";
import createQuizStyles from './CreateQuiz.module.css'

export default function CreateQuiz(props) {
  const [input, setInput] = useState({
    title: "",
    question: "",
    answer: "",
    correct: false
  });

  // const [testInput, setTestInput] = useState({
  //   title: "",
  //   questions: [],
  //   answers: []
  // })

  // const [questions, setQuestions] = useState([]);
  // const [answers, setAnswers] = useState([])

  const [numOfQuestions, setNumOfQuestions] = useState(0);
  const [numOfAnswers, setNumOfAnswers] = useState([0])

  const [questionInputs, setQuestionInputs] = useState([]);
  const [answerInputs, setAnswerInputs] = useState([])

  // useEffect(() => {
  //   if (answers.length) {
  //       console.log('answers updated', answers)
  //   }
  //   console.log(testInput)
  // }, [answers, testInput])

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
    console.log(input)
  }

  function handleClick(event) {
    setInput((prevInput) => {
      return {
        ...prevInput, correct: event.target.checked
      }
    })
    console.log(event.target.checked)
    console.log(input)
  }

  // function handleQuestionInputChange(event) {
  //   console.log(event)
  //   const {id, value} = event.target;
  //   const newQuestionInputs = [...questionInputs]
  //   newQuestionInputs[id] = value
  //   console.log(id, 'id')
  //   console.log(value)

  //   setQuestionInputs(newQuestionInputs);

  //   console.log(questionInputs, 'questioninputs')
  // }

  function createQuiz(event) {
    event.preventDefault();

    const newQuiz = {
      title: input.title,
    };

    axios
      .post("http://localhost:5000/quizzes/create", newQuiz)
      .then((res) => {
        console.log(res);
          const newQuestion = {
            quiz: res.data._id,
            question: input.question,
          };
          axios.post(
            "http://localhost:5000/quizzes/createquestion",
            newQuestion
          )
          .then((res) => {
            console.log(res)
            const newAnswer = {
              question: res.data._id,
              answer: input.answer,
              correct: input.correct
            }
            axios.post("http://localhost:5000/quizzes/createanswer", newAnswer)
          })
      })
      .then((res) => console.log("quiz created", res))
      .catch((err) => console.log("Error with quiz creation", err));
  }

  // function addQuestion(event) {
  //   event.preventDefault();
  //   setNumOfQuestions(numOfQuestions + 1);
  //   setQuestionInputs(q => [...q, ''])
  //   setQuestions((q) => [
  //     ...q,
  //     <CreateQuestion key={numOfQuestions} id={numOfQuestions}
  //       onChange={handleQuestionInputChange}
  //       value={questionInputs[numOfQuestions]} onClick={addAnswer}
  //     />,
  //   ]);
  //   setTestInput(t => ({...t, questions: [...t.questions, 'hello']}))
  //   const newAnswers = [...answers]
  //   newAnswers[numOfQuestions] = [<CreateAnswer key={numOfQuestions + 'a'} id={'a' + answers.length} onClick={addAnswer} />]
  //   setAnswers(newAnswers)
  // }

  // function addAnswer(event) {
  //   event.preventDefault()
  //   console.log(event)
  // }

  return (
  //   <div>
  //     <form>
  //       <label for="title">Quiz Title</label>
  //       <input
  //         onChange={handleChange}
  //         name="title"
  //         type="text"
  //         value={input.title}
  //       />
  //       <br />
  //       <br />
  //       {questions.map((q) => {
  //           return [q, answers[q.props.id].map(a => a)]
  //       })}
  //       <button name="question" onClick={addQuestion}>
  //         Add Question
  //       </button>
  //       <br />
  //       <br />
  //       <button onClick={createQuiz}>Create Quiz</button>
  //     </form>
  //   </div>
  <div className={createQuizStyles}>
    <h1>Create Quiz</h1>
    <form>
      <CreateTitle onChange={handleChange}  />
      <CreateQuestion onChange={handleChange} />
      <CreateAnswer className="create-answer-container" onChange={handleChange} onClick={handleClick} />
      <button onClick={createQuiz}>Submit</button>
    </form>
  </div>
   );
}
