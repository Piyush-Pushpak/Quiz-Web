import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "./Question";
import Result from "./Result";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [answers, setAnswers] = useState({});

  // Fetch quiz questions
  useEffect(() => {
    axios
      .get("https://thingproxy.freeboard.io/fetch/https://api.jsonserve.com/Uw5CrX")
      .then((response) => {
        setQuestions(response.data.questions);
      })
      .catch((error) => console.error("Error fetching quiz data", error));
  }, []);

  // Manage Quiz timer
  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
      return () => clearInterval(timer);
    }

    if (timeLeft === 0) setQuizCompleted(true);
  }, [quizStarted, timeLeft]);

  // Start the quiz and reset the timer
  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(300); // Reset Timer to 5 minutes (300 seconds)
  };

  // Manage user's answer
  const handleAnswer = (index, isCorrect) => {
    // Adjust score if changing the answer
    if (answers[currentQuestionIndex] !== undefined && questions[currentQuestionIndex].options[answers[currentQuestionIndex]].is_correct) {
      setScore(score - 1);
    }

    // Set the new answer and update score
    setAnswers({ ...answers, [currentQuestionIndex]: index });
    if (isCorrect) setScore(score + 1);

    // Move on the next question or complete the quiz
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  // For restart the quiz
  const attemptAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizStarted(false);
    setQuizCompleted(false);
    setTimeLeft(300); // Reset Timer
    setAnswers({});
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 relative">
      {/* Timer */}
      {quizStarted && !quizCompleted && (
        <div className={`absolute top-4 right-4 text-lg font-bold text-white px-6 py-2 rounded-full shadow-md ${timeLeft <= 60 ? "bg-red-600" : "bg-blue-500"}`}>
          ⏳ {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
        </div>
      )}

      {/* Render Question or Result based on the basis of quiz status */}
      {quizStarted && !quizCompleted ? (
        <Question
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          selectedOption={answers[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onNext={() => setCurrentQuestionIndex((prev) => prev + 1)}
          onPrevious={() => setCurrentQuestionIndex((prev) => prev - 1)}
          onSubmit={() => setQuizCompleted(true)}
        />
      ) : quizCompleted ? (
        <Result
          score={score}
          answers={answers}
          questions={questions}
          onRetry={attemptAgain}
        />
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz</h1>
          <button onClick={startQuiz} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default App;