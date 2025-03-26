import { useState } from "react";
import Button from "./Button";
import Card from "./Card";
import Question from "./Question";

interface InitialQuestionsProps {
  onComplete: (answers: {
    numberOfPeople: number;
    timeAvailable: string;
  }) => void;
}

export default function InitialQuestions({
  onComplete,
}: InitialQuestionsProps) {
  const [answers, setAnswers] = useState({
    numberOfPeople: "",
    timeAvailable: "",
  });

  const questions = [
    {
      id: "numberOfPeople",
      text: "How many people are going to watch the movie?",
      placeholder: "Enter number of people...",
    },
    {
      id: "timeAvailable",
      text: "How much time do you have to watch the movie?",
      placeholder: "e.g., 2 hours, 90 minutes...",
    },
  ];

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    const numberOfPeople = parseInt(answers.numberOfPeople);
    if (isNaN(numberOfPeople) || numberOfPeople < 1) {
      alert("Please enter a valid number of people");
      return;
    }
    onComplete({
      numberOfPeople,
      timeAvailable: answers.timeAvailable,
    });
  };

  const isFormComplete =
    answers.numberOfPeople.trim() && answers.timeAvailable.trim();

  return (
    <Card>
      <div className="space-y-8">
        <div className="flex items-center justify-center mb-6">
          <img src="/popcorn.png" alt="PopChoice" className="w-16 h-16" />
          <h1 className="text-4xl font-bold text-white ml-4">PopChoice</h1>
        </div>

        <div className="space-y-6">
          {questions.map((question) => (
            <Question
              key={question.id}
              question={question.text}
              placeholder={question.placeholder}
              value={answers[question.id as keyof typeof answers] || ""}
              onChange={(value) => handleAnswerChange(question.id, value)}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={!isFormComplete}
            className="w-full max-w-xs text-xl py-3"
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
