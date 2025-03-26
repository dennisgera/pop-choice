interface QuestionProps {
  question: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  options?: string[];
}

export default function Question({
  question,
  placeholder,
  value,
  onChange,
  type,
  options,
}: QuestionProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-white text-left">{question}</h2>
      {type === "text" ? (
        <textarea
          className="w-full p-4 rounded-lg bg-gray-700/70 text-white placeholder-gray-400 text-lg min-h-[80px] focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : type === "number" ? (
        <input
          type="number"
          className="w-full p-4 rounded-lg bg-gray-700/70 text-white placeholder-gray-400 text-lg min-h-[80px] focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div className="flex flex-wrap gap-2">
          {options &&
            options.map((option) => (
              <button
                key={option}
                className={`px-4 py-2 rounded-lg bg-gray-700/70 text-white placeholder-gray-400 text-lg min-h-[60px] focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  value === option ? "bg-green-400 text-black" : ""
                }`}
                onClick={() => onChange(option)}
              >
                {option}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
