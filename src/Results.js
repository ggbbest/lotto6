import React from "react";

const Results = ({ games, hits, money }) => {
  const prize = 3;
  const information = hits ? `Trafiłeś ${hits}-kę!` : "Nic nie trafiłeś...";
  return (
    <section className="results">
      <h3 className="info">{games ? information : "..."}</h3>
      <div className="games">
        <span>게임 수:</span>
        <span>{games}</span>
      </div>
      <div className="wallet">
        <span>베팅 금액:</span>
        <span>{games * prize} c4ei</span>
      </div>
      <div className="money">
        <span>당첨금액:</span>
        <span>{money} c4ei</span>
      </div>
    </section>
  );
};

export default Results;
