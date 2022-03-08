import React from "react";
import Ball from "./Ball";

const Display = ({ drawedNumbers }) => {
  const balls = drawedNumbers.map((number) => (
    <Ball key={number} number={number} />
  ));
  const displayInfo = drawedNumbers.length ? balls : "쿠폰에서 6개의 숫자를 지우십시오.";
  return <div className="display">{displayInfo}</div>;
};

export default Display;
