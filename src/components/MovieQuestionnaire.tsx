import { useState } from "react";
import Button from "./Button";
import Card from "./Card";
import { getMovieRecommendation } from "../services/movieService";
import type { Movie } from "../services/openaiService";
import Question from "./Question";

interface MovieQuestionnaireProp {
  onComplete: (result: Movie) => void;
  numberOfPeople: number;
  timeAvailable: string;
  onBack: () => void;
}

export default function MovieQuestionnaire({
  onComplete,
  numberOfPeople,
  timeAvailable,
  onBack,
}: MovieQuestionnaireProp) {
  const [currentPerson, setCurrentPerson] = useState(1);
  const [allAnswers, setAllAnswers] = useState<
    Record<number, Record<string, string>>
  >({});
  const [currentAnswers, setCurrentAnswers] = useState<Record<string, string>>(
    {}
  );

  const questions = [
    {
      id: "favorite",
      text: "What's your favorite movie and why?",
      type: "text",
      placeholder: "Type your favorite movie and reason...",
    },
    {
      id: "era",
      text: "Are you in the mood for something new or a classic?",
      type: "multiple",
      options: ["New", "Classic"],
      placeholder: "Type your preference...",
    },
    {
      id: "mood",
      text: "Do you wanna have fun or do you want something serious?",
      type: "multiple",
      options: ["Fun", "Serious"],
      placeholder: "Type your mood preference...",
    },
    {
      id: "stranded",
      text: "Which famous film person would you love to be stranded on an island with and why?",
      type: "text",
      placeholder: "Type your favorite film person...",
    },
  ];

  const handleAnswerChange = (questionId: string, value: string) => {
    setCurrentAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNextPerson = () => {
    if (currentPerson < numberOfPeople) {
      setAllAnswers((prev) => ({
        ...prev,
        [currentPerson]: currentAnswers,
      }));
      setCurrentPerson((prev) => prev + 1);
      setCurrentAnswers({});
    }
  };

  const handleBack = () => {
    if (currentPerson > 1) {
      setAllAnswers((prev) => ({
        ...prev,
        [currentPerson]: currentAnswers,
      }));
      setCurrentPerson((prev) => prev - 1);
      setCurrentAnswers(allAnswers[currentPerson - 1] || {});
    } else {
      onBack();
    }
  };

  const handleSubmit = async () => {
    try {
      const finalAnswers = {
        ...allAnswers,
        [currentPerson]: currentAnswers,
      };

      // Combine all answers into a single string for the API
      const combinedAnswers = Object.entries(finalAnswers).reduce(
        (acc, [person, answers]) => {
          return {
            ...acc,
            ...Object.entries(answers).reduce(
              (personAcc, [key, value]) => ({
                ...personAcc,
                [`${key}_person${String(person)}`]: value,
              }),
              {}
            ),
          };
        },
        {}
      );

      const result = await getMovieRecommendation({
        ...combinedAnswers,
        numberOfPeople: String(numberOfPeople),
        timeAvailable,
      });
      onComplete(result);
    } catch (error) {
      console.error("Failed to get movie recommendation:", error);
      alert("Failed to get movie recommendation. Please try again.");
    }
  };

  const isFormComplete = questions.every((q) => currentAnswers[q.id]?.trim());
  const isLastPerson = currentPerson === numberOfPeople;

  return (
    <Card>
      <div className="space-y-8">
        <div className="flex items-center justify-center mb-6">
          <img src="/popcorn.png" alt="PopChoice" className="w-16 h-16" />
          <h1 className="text-4xl font-bold text-white ml-4">PopChoice</h1>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-white">
            Person {currentPerson} of {numberOfPeople}
          </h2>
        </div>

        <div className="space-y-6">
          {questions.map((question) => (
            <Question
              key={question.id}
              question={question.text}
              type={question.type}
              options={question.options}
              placeholder={question.placeholder}
              value={currentAnswers[question.id] || ""}
              onChange={(value) => handleAnswerChange(question.id, value)}
            />
          ))}
        </div>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={handleBack}
            variant="secondary"
            className="w-full max-w-xs text-xl py-3"
          >
            Back
          </Button>
          <Button
            onClick={isLastPerson ? handleSubmit : handleNextPerson}
            disabled={!isFormComplete}
            className="w-full max-w-xs text-xl py-3"
          >
            {isLastPerson ? "Let's Go" : "Next Person"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
