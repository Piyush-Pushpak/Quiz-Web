import { useState } from "react";

const Result = ({ score, answers, questions, onRetry }) => {
  const [showSolutions, setShowSolutions] = useState(false);

  const totalQuestions = questions.length;
  const rightAnswers = score;
  const skippedQuestions = totalQuestions - Object.keys(answers).length;
  const wrongAnswers = totalQuestions - score - skippedQuestions;
  const totalMarks = score - (wrongAnswers * 0);

  return (
    <div className="p-6 sm:p-8 md:p-10 shadow-lg w-full sm:w-[400px] md:w-2/3 mx-auto text-center rounded-xl bg-white">
      <h2 className="text-2xl text-gray-800 mb-4 font-semibold">Quiz Completed!</h2>

      <p className="text-lg text-gray-700 font-medium">Total Questions: {totalQuestions}</p>
      <p className="text-lg text-green-600 font-medium">Right Answers: {rightAnswers}</p>
      <p className="text-lg text-red-600 font-medium">Wrong Answers: {wrongAnswers}</p>
      <p className="text-lg text-yellow-600 font-medium">Skipped Questions: {skippedQuestions}</p>
      <p className="text-lg text-blue-600 font-medium">Total Marks: {totalMarks}</p>

      {/* View Solutions Button */}
      <button
        onClick={() => setShowSolutions(!showSolutions)}
        className="mt-4 bg-blue-500 text-white px-6 py-2 hover:bg-blue-600 transition rounded-lg shadow-md"
      >
        {showSolutions ? "Hide Solutions" : "View Detailed Solution"}
      </button>

      {/* Attempt Again Button */}
      <button
        onClick={onRetry}
        className="mt-4 ml-4 bg-green-500 text-white px-6 py-2 hover:bg-green-600 transition rounded-lg shadow-md"
      >
        Attempt Again
      </button>

      {/* Show Solutions */}
      {showSolutions && (
        <div className="mt-6 text-left">
          {questions.map((question, index) => {
            const userAnswerIndex = answers[index];
            const correctOption = question.options.find((opt) => opt.is_correct);

            return (
              <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-100">
                <h3 className="font-semibold text-lg">Question {index + 1}:</h3>
                <p className="text-gray-700 font-bold">{question.description}</p>

                <p className="mt-2 text-blue-600 font-medium">
                  From Topic:
                  <span className="ml-2 text-black">{question.topic || "N/A"}</span>
                </p>

                <p className="mt-2 text-green-600 font-medium">
                  Correct Answer:
                  <span className="ml-2 text-black">
                    {correctOption ? correctOption.description : "Answer Not Available"}
                  </span>
                </p>

                <p className="mt-2 font-medium text-red-600">
                  Your Answer:
                  <span className="ml-2 text-black">
                    {userAnswerIndex !== undefined
                      ? question.options[userAnswerIndex].description
                      : "Not Answered"}
                  </span>
                </p>

                <p className="mt-2 font-medium text-orange-700">
                  Explanation:
                  <span className="ml-2 text-black">{question.detailed_solution || "No Explanation Available"}</span>
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Result;