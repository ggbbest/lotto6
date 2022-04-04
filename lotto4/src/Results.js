import React from "react";

const Results = ({ games, hits, money , chips }) => {
  // const prize = 1;
  const information = hits ? `${hits}개 맞음` : "0개 맞음";
  return (
    <section className="results">
      <h3 className="info" style={{display: "none"}}>{games ? information : "..."}</h3>
      <div className="games" style={{display: "none"}}>
        <span>게임 수:</span>
        <span>{games}</span>
      </div>
      <div className="wallet">
      </div>
      <div className="money" style={{display: "none"}}>
        <span>당첨금액:</span>
        <span>{money} C4EI</span>
      </div>
    </section>
  );
};

export default Results;
