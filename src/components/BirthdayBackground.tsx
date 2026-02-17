"use client";

import { useMemo } from "react";

const COLORS = [
  "#F9DC5C", // naples
  "#FE4A49", // tomato
  "#5C7AF9", // blue-violet
  "#B05CF9", // soft violet
  "#49DEBF", // mint
  "#49A8FE", // sky blue
];

interface BalloonProps {
  color: string;
  left: string;
  top: string;
  delay: string;
  duration: string;
  size: number;
  sway: string;
}

const Balloon = ({
  color,
  left,
  top,
  delay,
  duration,
  size,
  sway,
}: BalloonProps) => (
  <div
    className="absolute animate-[balloon-float_var(--duration)_var(--delay)_infinite_ease-in-out]"
    style={
      {
        left,
        top,
        "--delay": delay,
        "--duration": duration,
        "--sway": sway,
      } as React.CSSProperties
    }
  >
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 40 56"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="20" cy="18" rx="16" ry="18" fill={color} />
      <polygon points="14,34 20,40 26,34" fill={color} opacity="0.8" />
      <line
        x1="20"
        y1="40"
        x2="20"
        y2="56"
        stroke={color}
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  </div>
);

interface ConfettiProps {
  color: string;
  left: string;
  delay: string;
  duration: string;
  width: number;
  height: number;
  spin: string;
}

const Confetti = ({
  color,
  left,
  delay,
  duration,
  width,
  height,
  spin,
}: ConfettiProps) => (
  <div
    className="absolute top-0 animate-[confetti-fall_var(--duration)_var(--delay)_infinite_linear] opacity-[0.25]"
    style={
      {
        left,
        "--delay": delay,
        "--duration": duration,
        "--spin": spin,
      } as React.CSSProperties
    }
  >
    <div
      className="rounded-[1px]"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color,
      }}
    />
  </div>
);

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export const BirthdayBackground = () => {
  const { balloons, confetti } = useMemo(() => {
    const balloons = Array.from({ length: 9 }, (_, i) => ({
      key: `balloon-${i}`,
      color: COLORS[i % COLORS.length],
      left: `${randomBetween(5, 95)}%`,
      top: `${randomBetween(10, 80)}%`,
      delay: `${randomBetween(0, 12)}s`,
      duration: `${randomBetween(14, 22)}s`,
      size: Math.round(randomBetween(80, 160)),
      sway: `${randomBetween(-10, 10)}deg`,
    }));

    const confetti = Array.from({ length: 54 }, (_, i) => ({
      key: `confetti-${i}`,
      color: COLORS[i % COLORS.length],
      left: `${randomBetween(2, 98)}%`,
      delay: `${randomBetween(0, 10)}s`,
      duration: `${randomBetween(8, 16)}s`,
      width: Math.round(randomBetween(4, 8)),
      height: Math.round(randomBetween(10, 20)),
      spin: `${randomBetween(360, 1080)}deg`,
    }));

    return { balloons, confetti };
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {balloons.map(({ key, ...props }) => (
        <Balloon key={key} {...props} />
      ))}
      {confetti.map(({ key, ...props }) => (
        <Confetti key={key} {...props} />
      ))}
    </div>
  );
};
