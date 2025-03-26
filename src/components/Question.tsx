interface QuestionProps {
  question: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Question({
  question,
  placeholder,
  value,
  onChange,
}: QuestionProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold text-white">{question}</h2>
      <textarea
        className="w-full p-4 rounded-lg bg-gray-700/70 text-white placeholder-gray-400 text-lg min-h-[80px] focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
