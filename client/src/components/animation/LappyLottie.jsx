import React from "react";
import { useMediaQuery } from "@mui/material";
import Lottie from "react-lottie";
import Lappy from './Lappy.json'
export default function LappyLottie() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Lappy,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div style={{ marginRight: {xs:0,md:"50px"} }}>
      <Lottie options={defaultOptions} height={500} width={500} />
    </div>
  );
}
