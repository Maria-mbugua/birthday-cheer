import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const EMOJIS = ["🎂", "🎁", "🎈", "🎉", "🥳", "✨", "💛", "🎊"];

const Index = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    // Initial big burst
    const burst = () => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#e6a817", "#e04a6b", "#9b59b6", "#f39c12", "#fff"],
      });
    };

    burst();
    const t1 = setTimeout(burst, 700);
    const t2 = setTimeout(burst, 1400);

    // Continuous subtle confetti
    const interval = setInterval(() => {
      confetti({
        particleCount: 8,
        angle: 60 + Math.random() * 60,
        spread: 55,
        origin: { x: Math.random(), y: -0.1 },
        colors: ["#e6a817", "#e04a6b", "#9b59b6", "#f39c12"],
      });
    }, 800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 overflow-hidden relative">
      {/* Floating emojis */}
      {EMOJIS.map((emoji, i) => (
        <span
          key={i}
          className="absolute text-3xl md:text-5xl animate-float pointer-events-none select-none"
          style={{
            left: `${10 + i * 11}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${4 + (i % 3)}s`,
            top: `${15 + (i % 4) * 18}%`,
            opacity: 0.7,
          }}
        >
          {emoji}
        </span>
      ))}

      {/* Main content */}
      <div
        className={`relative z-10 text-center transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-8xl md:text-9xl mb-6 animate-bounce-slow">🎂</div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4 birthday-gradient-text">
          Happy Birthday!
        </h1>

        <div className="w-24 h-1 mx-auto rounded-full bg-primary mb-6 animate-pulse" />

        <p className="text-xl md:text-2xl text-muted-foreground max-w-lg mx-auto leading-relaxed mb-8">
          Wishing you a day filled with love, laughter, and all the wonderful things you deserve.
          Here's to an amazing year ahead! 🥂
        </p>

        <div className="flex justify-center gap-3 flex-wrap">
          {["🎈", "🎁", "🎉", "🎊", "💫"].map((e, i) => (
            <span
              key={i}
              className="text-4xl md:text-5xl animate-bounce-slow cursor-default"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {e}
            </span>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground tracking-widest uppercase">
          ✨ Make a wish ✨
        </p>
      </div>

      {/* Glow effect behind text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
      </div>
    </div>
  );
};

export default Index;
