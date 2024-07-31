import React from "react";
import Lottie from "react-lottie";

import Wrong from './Wrong.json'

export default function WrongOption() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Wrong,
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
