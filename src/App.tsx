import { useState } from "react";
import "./App.css";
import MovieQuestionnaire from "./components/MovieQuestionnaire";
import MovieResult from "./components/MovieResult";

function App() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ title: "", description: "" });

  const handleComplete = (movieResult: {
    title: string;
    description: string;
  }) => {
    setResult(movieResult);
    setShowResult(true);
  };

  const handleReset = () => {
    setShowResult(false);
    setResult({ title: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-navy-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-16">
          <img src="/popcorn.png" alt="PopChoice" className="w-36 h-36 mb-4" />
          <h1 className="text-5xl font-bold text-center text-gray-800/70">
            PopChoice
          </h1>
        </div>

        {showResult ? (
          <MovieResult
            title={result.title}
            description={result.description}
            onReset={handleReset}
          />
        ) : (
          <MovieQuestionnaire onComplete={handleComplete} />
        )}
      </div>
    </div>
  );
}

export default App;
