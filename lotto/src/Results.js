import React from "react";

const Results = ({ games, hits, money }) => {
  const prize = 1;
  const information = hits ? `${hits}개 맞음` : "0개 맞음";
  return (
    <section className="results">
      <h3 className="info" style={{display: "none"}}>{games ? information : "..."}</h3>
      <div className="games" style={{display: "none"}}>
        <span>게임 수:</span>
        <span>{games}</span>
      </div>
      <div className="wallet">
        <span>베팅 코인수:</span>
        <span>{games * prize} klay</span>
      </div>
      <div className="money" style={{display: "none"}}>
        <span>당첨금액:</span>
        <span>{money} klay</span>
      </div>
    </section>
  );
};

export default Results;
