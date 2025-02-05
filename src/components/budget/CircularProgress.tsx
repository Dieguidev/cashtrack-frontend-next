'use client'
import { useEffect, useState } from "react";

type CircularProgressProps = {
  value: number; // Porcentaje (0 - 100)
  strokeWidth?: number; // Grosor de la barra
  color?: string; // Color del progreso
  backgroundColor?: string; // Color del fondo
  text?: string; // Texto dentro del círculo
  overfillColor?: string; // Color cuando excede el 100%
}

export const CircularProgress = ({
  value,
  strokeWidth = 10,
  color = "#E98E00",
  backgroundColor = "#E0E0E0",
  text = "Gastado",
  overfillColor = "#FF0000",
}: CircularProgressProps) => {

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setProgress(value), 300); // Simula animación inicial
  }, [value]);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(progress, 100) / 100) * circumference;
  const overfillOffset = progress > 100 ? circumference - ((progress - 100) / 100) * circumference : circumference;

  const textColor = progress <= 100 ? color : overfillColor;

  return (
    <div className="w-[80%] max-w-[300px] aspect-square relative flex items-center justify-center">
      <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-in-out"
        />
        {progress > 100 && (
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={overfillColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={overfillOffset}
            className="transition-all duration-500 ease-in-out"
          />
        )}
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-[30px] font-bold" style={{ color:textColor }}>{value <=100?progress: value-100}%</span>
        <span className="text-[30px] font bold" style={{ color: textColor }}>{value <=100?text: 'Excedido'}</span>
      </div>
    </div>
  );
}
