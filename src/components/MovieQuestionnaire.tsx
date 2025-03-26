import { useState } from "react";
import Button from "./Button";
import Card from "./Card";
import { getMovieRecommendation } from "../services/movieService";
import type { Movie } from "../services/openaiService";
import Question from "./Question";
interface MovieQuestionnaireProp {
  onComplete: (result: Movie) => void;
}

export default function MovieQuestionnaire({
  onComplete,
}: MovieQuestionnaireProp) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: "favorite",
      text: "What's your favorite movie and why?",
      placeholder: "Type your favorite movie and reason...",
    },
    {
      id: "era",
      text: "Are you in the mood for something new or a classic?",
      placeholder: "Type your preference...",
    },
    {
      id: "mood",
      text: "Do you wanna have fun or do you want something serious?",
      placeholder: "Type your mood preference...",
    },
  ];

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const result = await getMovieRecommendation(answers);
      onComplete(result);
    } catch (error) {
      console.error("Failed to get movie recommendation:", error);
      alert("Failed to get movie recommendation. Please try again.");
    }
  };

  const isFormComplete = questions.every((q) => answers[q.id]?.trim());

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
              value={answers[question.id] || ""}
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
            Let's Go
          </Button>
        </div>
      </div>
    </Card>
  );
}
