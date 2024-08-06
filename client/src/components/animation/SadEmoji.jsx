import React from "react";
import Lottie from "react-lottie";

import SadEmoji from "./SadEmoji.json";
export default function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: SadEmoji,
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
