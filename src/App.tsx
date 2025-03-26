import { useState } from "react";
import "./App.css";
import MovieQuestionnaire from "./components/MovieQuestionnaire";
import MovieResult from "./components/MovieResult";
import InitialQuestions from "./components/InitialQuestions";

interface Movie {
  title: string;
  description: string;
}

interface InitialAnswers {
  numberOfPeople: number;
  timeAvailable: string;
}

function App() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<Movie>({ title: "", description: "" });
  const [initialAnswers, setInitialAnswers] = useState<InitialAnswers | null>(
    null
  );

  const handleInitialComplete = (answers: InitialAnswers) => {
    setInitialAnswers(answers);
  };

  const handleComplete = (movieResult: Movie) => {
    setResult(movieResult);
    setShowResult(true);
  };

  const handleReset = () => {
    setShowResult(false);
    setResult({ title: "", description: "" });
    setInitialAnswers(null);
  };

  return (
    <div className="container mx-auto px-4">
      {showResult ? (
        <MovieResult
          title={result.title}
          description={result.description}
          onReset={handleReset}
        />
      ) : !initialAnswers ? (
        <InitialQuestions onComplete={handleInitialComplete} />
      ) : (
        <MovieQuestionnaire
          onComplete={handleComplete}
          numberOfPeople={initialAnswers.numberOfPeople}
          timeAvailable={initialAnswers.timeAvailable}
          onBack={() => setInitialAnswers(null)}
        />
      )}
    </div>
  );
}

export default App;
