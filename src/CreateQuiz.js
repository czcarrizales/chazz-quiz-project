import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateQuestion from "./CreateQuestion";
import CreateAnswer from "./CreateAnswer";

export default function CreateQuiz(props) {
  const [input, setInput] = useState({
    title: ""
  });

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([])

  const [numOfQuestions, setNumOfQuestions] = useState(0);
  const [numOfAnswers, setNumOfAnswers] = useState([0])

  const [questionInputs, setQuestionInputs] = useState([]);
  const [answerInputs, setAnswerInputs] = useState([])

  useEffect(() => {
    if (answers.length) {
        console.log('answers updated', answers)
    }
  }, [answers])

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function handleQuestionInputChange(event) {
    console.log(event)
    const {id, value} = event.target;
    const newQuestionInputs = [...questionInputs]
    newQuestionInputs[id] = value
    console.log(id, 'id')
    console.log(value)

    setQuestionInputs(newQuestionInputs);

    console.log(questionInputs, 'questioninputs')
  }

  function createQuiz(event) {
    event.preventDefault();

    const newQuiz = {
      title: input.title,
    };

    axios
      .post("http://localhost:5000/quizzes/create", newQuiz)
      .then((res) => {
        console.log(res);
        for (let i = 0; i < numOfQuestions; i++) {
          const newQuestion = {
            quiz: res.data._id,
            question: questionInputs[i],
          };
          axios.post(
            "http://localhost:5000/quizzes/createquestion",
            newQuestion
          );
        }
      })
      .then((res) => console.log("quiz created", res))
      .catch((err) => console.log("Error with quiz creation", err));
  }

  function addQuestion(event) {
    event.preventDefault();
    setNumOfQuestions(numOfQuestions + 1);
    setQuestionInputs(q => [...q, ''])
    setQuestions((q) => [
      ...q,
      <CreateQuestion key={numOfQuestions} id={numOfQuestions}
        onChange={handleQuestionInputChange}
        value={questionInputs[numOfQuestions]}
      />,
    ]);
    const newAnswers = [...answers]
    newAnswers[numOfQuestions] = [<CreateAnswer key={numOfQuestions + 'a'} id={'a' + answers.length} onClick={addAnswer} />]
    setAnswers(newAnswers)
  }

  function addAnswer(event) {
    event.preventDefault()
    const newAnswers = [...answers]
    console.log(event.target.id, 'id')
    console.log(answers.length)
  }

  return (
    <div>
      <form>
        <label for="title">Quiz Title</label>
        <input
          onChange={handleChange}
          name="title"
          type="text"
          value={input.title}
        />
        <br />
        <br />
        {questions.map((q) => {
            return [q, answers[q.props.id].map(a => a)]
        })}
        <button name="question" onClick={addQuestion}>
          Add Question
        </button>
        <br />
        <br />
        <button onClick={createQuiz}>Create Quiz</button>
      </form>
    </div>
  );
}
