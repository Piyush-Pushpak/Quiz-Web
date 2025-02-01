import { useState, useEffect } from "react";

const Question = ({ question, onAnswer, selectedOption, questionNumber, totalQuestions, onNext, onPrevious, onSubmit }) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  // Reset selected option when question changes
  useEffect(() => {
    setSelectedOptionIndex(selectedOption);
  }, [question, selectedOption]);

  if (!question) return <div>Loading...</div>;

  const { description, options } = question;
  if (!Array.isArray(options)) return <div>Options are not available</div>;

  return (
    <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg w-full sm:w-[350px] md:w-2/3 mx-auto h-auto">
      {/* Question Number display */}
      <div className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
        Question {questionNumber} of {totalQuestions}
      </div>

      {/* Question Text */}
      <h2 className="text-xl font-semibold mb-4">{description}</h2>

      {/* Answer Options */}
      <div className="space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedOptionIndex(index);
              onAnswer(index, option.is_correct);
            }}
            className={`w-full flex items-center justify-start px-4 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${selectedOptionIndex === index ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-blue-500 hover:text-white"
              }`}
          >
            <span className="font-medium text-lg">
              {index + 1}. {option.description}
            </span>
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        {/* Previous Button */}
        {questionNumber > 1 && (
          <button onClick={onPrevious} className="px-4 py-2 rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 text-white transition">
            Previous
          </button>
        )}

        {/* Next and Submit Button */}
        {questionNumber < totalQuestions ? (
          <button onClick={onNext} className="px-4 py-2 rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 text-white transition">
            Next
          </button>
        ) : (
          <button onClick={onSubmit} className="px-4 py-2 rounded-lg shadow-md bg-green-500 hover:bg-green-600 text-white transition">
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;