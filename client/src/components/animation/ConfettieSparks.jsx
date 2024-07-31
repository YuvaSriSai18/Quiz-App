import React from "react";
import Confetti from './Confetti.json'
import Lottie from "react-lottie";

export default function ConfettieSparks() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Confetti,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div style={{ marginRight: "50px" }}>
      <Lottie options={defaultOptions} height={500} width={500} />
    </div>
  );
}
