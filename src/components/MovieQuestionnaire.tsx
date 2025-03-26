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
  const [currentStep, setCurrentStep] = useState(0);
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

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentStep].text]: value,
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

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-gray-800/50 rounded-xl p-8 shadow-lg">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-white text-center">
            {questions[currentStep].text}
          </h2>
          <textarea
            className="w-full p-4 rounded-lg bg-gray-700/70 text-white placeholder-gray-400 text-lg min-h-[120px] focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder={questions[currentStep].placeholder}
            value={answers[questions[currentStep].text] || ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
          />
        </div>

        <div className="mt-8 flex justify-center gap-4">
          {currentStep > 0 && (
            <Button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              variant="secondary"
            >
              Back
            </Button>
          )}
          <Button
            onClick={() => {
              if (currentStep === questions.length - 1) {
                handleSubmit();
              } else {
                setCurrentStep((prev) => prev + 1);
              }
            }}
            disabled={!answers[questions[currentStep].text]}
          >
            {currentStep === questions.length - 1 ? "Let's Go" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
