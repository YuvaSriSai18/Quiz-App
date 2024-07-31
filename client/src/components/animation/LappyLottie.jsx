import React from "react";
import { useMediaQuery } from "@mui/material";
import Lottie from "react-lottie";
import Lappy from './Lappy.json'
export default function LappyLottie() {
  const isMobile = useMediaQuery("(max-width:600px)");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Lappy,
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
