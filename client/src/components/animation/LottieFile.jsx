import React from "react";
import { useMediaQuery } from "@mui/material";
import Lottie from "react-lottie";
import LappyLottie from "./LappyLottie.json";
export default function LottieFile() {
  const isMobile = useMediaQuery("(max-width:600px)");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LappyLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div style={{ marginRight: "50px" }}>
      {!isMobile && (
        <Lottie options={defaultOptions} height={500} width={500} />
      )}
    </div>
  );
}
