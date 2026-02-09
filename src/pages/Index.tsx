import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";

const SPARKLES = ["✨", "⭐", "💫", "🌟", "✨", "⭐"];

const Index = () => {
  const [stage, setStage] = useState<"idle" | "shaking" | "opening" | "revealed">("idle");
  const boxRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (stage !== "idle") return;
    setStage("shaking");

    setTimeout(() => {
      setStage("opening");
    }, 1200);

    setTimeout(() => {
      setStage("revealed");
      // Big confetti explosion
      const burst = () =>
        confetti({
          particleCount: 200,
          spread: 120,
          origin: { y: 0.5 },
          colors: ["#e6a817", "#e04a6b", "#9b59b6", "#f39c12", "#fff", "#ff6b9d"],
        });
      burst();
      setTimeout(burst, 300);
      setTimeout(burst, 600);

      // Continuous sparkle
      const interval = setInterval(() => {
        confetti({
          particleCount: 5,
          angle: 60 + Math.random() * 60,
          spread: 55,
          origin: { x: Math.random(), y: -0.1 },
          colors: ["#e6a817", "#e04a6b", "#9b59b6"],
        });
      }, 1200);

      setTimeout(() => clearInterval(interval), 15000);
    }, 2200);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 overflow-hidden relative select-none">
      {/* Floating sparkles */}
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="absolute text-2xl md:text-4xl animate-float pointer-events-none"
          style={{
            left: `${8 + i * 16}%`,
            top: `${10 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${3 + (i % 3)}s`,
            opacity: stage === "revealed" ? 0.9 : 0.3,
            transition: "opacity 1s ease",
          }}
        >
          {s}
        </span>
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Pre-open state */}
        {stage !== "revealed" && (
          <>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-center birthday-gradient-text mb-2">
              You Have a Surprise!
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl text-center max-w-md">
              Tap the gift box to unwrap it 🎁
            </p>
          </>
        )}

        {/* Gift Box */}
        {stage !== "revealed" && (
          <div
            ref={boxRef}
            onClick={handleOpen}
            className={`relative cursor-pointer transition-all duration-300 ${
              stage === "shaking" ? "animate-shake" : "hover:scale-105"
            } ${stage === "opening" ? "animate-open-box" : ""}`}
          >
            {/* Box lid */}
            <div
              className={`relative z-10 w-40 h-12 md:w-56 md:h-16 rounded-t-xl bg-secondary flex items-center justify-center transition-all duration-700 ${
                stage === "opening"
                  ? "-translate-y-16 rotate-[-30deg] opacity-0"
                  : ""
              }`}
            >
              {/* Ribbon on lid */}
              <div className="w-6 md:w-8 h-full bg-primary/80 rounded-t-sm" />
              {/* Bow */}
              <div className="absolute -top-4 md:-top-5 text-3xl md:text-4xl">🎀</div>
            </div>

            {/* Box body */}
            <div
              className={`relative w-40 h-32 md:w-56 md:h-44 rounded-b-xl bg-secondary/80 flex items-center justify-center overflow-hidden transition-all duration-700 ${
                stage === "opening" ? "scale-90 opacity-0" : ""
              }`}
            >
              {/* Vertical ribbon */}
              <div className="absolute w-6 md:w-8 h-full bg-primary/80" />
              {/* Horizontal ribbon */}
              <div className="absolute w-full h-6 md:h-8 bg-primary/80" />
              {/* Glow inside */}
              <div
                className={`absolute inset-0 bg-primary/20 transition-opacity duration-500 ${
                  stage === "shaking" ? "opacity-100 animate-pulse" : "opacity-0"
                }`}
              />
            </div>

            {/* Shadow */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-36 md:w-48 h-4 bg-foreground/5 rounded-full blur-lg" />
          </div>
        )}

        {/* Revealed content */}
        {stage === "revealed" && (
          <div className="flex flex-col items-center gap-6 animate-fade-in-up">
            <div className="text-8xl md:text-9xl animate-bounce-slow">🎂</div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight birthday-gradient-text text-center">
              Happy Birthday!
            </h1>

            <div className="w-24 h-1 mx-auto rounded-full bg-primary animate-pulse" />

            <p className="text-xl md:text-2xl text-muted-foreground max-w-lg mx-auto leading-relaxed text-center">
              Wishing you a day filled with love, laughter, and all the wonderful
              things you deserve. Here's to an amazing year ahead! 🥂
            </p>

            <div className="flex justify-center gap-3 flex-wrap mt-2">
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

            <p className="mt-6 text-sm text-muted-foreground tracking-widest uppercase">
              ✨ Make a wish ✨
            </p>
          </div>
        )}
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-1000 ${
            stage === "revealed"
              ? "bg-primary/15 scale-150"
              : "bg-primary/5 scale-100"
          }`}
        />
      </div>
    </div>
  );
};

export default Index;
