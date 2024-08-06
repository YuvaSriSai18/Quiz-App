// src/sadEmojiConfetti.js

const duration = 15 * 1000;
let animationEnd = Date.now() + duration;
let skew = 1;

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function SadConfetti() {
  animationEnd = Date.now() + duration; // Reset animation end time
  skew = 1; // Reset skew

  (function frame() {
    const timeLeft = animationEnd - Date.now();
    const ticks = Math.max(200, 500 * (timeLeft / duration));

    skew = Math.max(0.8, skew - 0.001);

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        // Since particles fall down, skew start toward the top
        y: Math.random() * skew - 0.2,
      },
      colors: ["#ffffff"],
      shapes: ["image"],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(2, 3), // Increase scalar to enlarge the image
      drift: randomInRange(-0.4, 0.4),
      shapeOptions: {
        image: [
          {
            src: "https://i.pinimg.com/originals/da/8c/21/da8c2163061be58d770f6f9af78258e8.png", // Path to your sad emoji image
            width: 500,
            height: 500,
          },
        ],
      },
    });

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  })();
}
