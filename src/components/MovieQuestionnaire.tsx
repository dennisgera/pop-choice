import { useState } from "react";
import Button from "./Button";

interface MovieQuestionnaireProp {
  onComplete: (result: { title: string; description: string }) => void;
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
      [questions[currentStep].id]: value,
    }));
  };

  const handleSubmit = () => {
    // This is a mock recommendation - in a real app, you'd use an algorithm
    onComplete({
      title: "School of Rock (2009)",
      description:
        "A fun and stupid movie about a wannabe rocker turned fraud substitute teacher forming a rock band with his students to win the Battle of the Bands",
    });
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
            value={answers[questions[currentStep].id] || ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
          />
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => {
              if (currentStep === questions.length - 1) {
                handleSubmit();
              } else {
                setCurrentStep((prev) => prev + 1);
              }
            }}
          >
            {currentStep === questions.length - 1 ? "Let's Go" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
