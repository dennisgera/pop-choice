import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-gray-800/50 rounded-xl p-8 shadow-lg">{children}</div>
    </div>
  );
}
