import Button from "./Button";
import Card from "./Card";

interface MovieResultProps {
  title: string;
  description: string;
  onReset: () => void;
}

export default function MovieResult({
  title,
  description,
  onReset,
}: MovieResultProps) {
  return (
    <Card>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          {description}
        </p>
        <Button onClick={onReset}>Go Again</Button>
      </div>
    </Card>
  );
}
