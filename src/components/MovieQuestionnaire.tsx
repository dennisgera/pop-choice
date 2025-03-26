import { useState } from "react";
import Button from "./Button";
import { getMovieRecommendation } from "../services/movieService";
import type { Movie } from "../services/openaiService";

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
    <div className="max-w-xl mx-auto">
      <div className="bg-gray-800/50 rounded-xl p-8 shadow-lg space-y-8">
        <div className="flex items-center justify-center mb-6">
          <img src="/popcorn.png" alt="PopChoice" className="w-16 h-16" />
          <h1 className="text-4xl font-bold text-white ml-4">PopChoice</h1>
        </div>

        <div className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="space-y-3">
              <h2 className="text-xl font-semibold text-white">
                {question.text}
              </h2>
              <textarea
                className="w-full p-4 rounded-lg bg-gray-700/70 text-white placeholder-gray-400 text-lg min-h-[80px] focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder={question.placeholder}
                value={answers[question.id] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
              />
            </div>
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
    </div>
  );
}
