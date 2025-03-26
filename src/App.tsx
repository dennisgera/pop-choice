import { useState } from "react";
import "./App.css";
import MovieQuestionnaire from "./components/MovieQuestionnaire";
import MovieResult from "./components/MovieResult";

interface Movie {
  title: string;
  description: string;
}

function App() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<Movie>({ title: "", description: "" });

  const handleComplete = (movieResult: Movie) => {
    setResult(movieResult);
    setShowResult(true);
  };

  const handleReset = () => {
    setShowResult(false);
    setResult({ title: "", description: "" });
  };

  return (
    <div className="container mx-auto px-4">
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
  );
}

export default App;
