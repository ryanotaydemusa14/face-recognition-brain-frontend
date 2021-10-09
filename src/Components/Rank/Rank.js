import React from "react";
import "./Rank.css";
const Rank = ({ name, entries}) => {
  return (
    <div className="rank">
      <div>{`${ name}, Your rank is..`}</div>
      <div>{entries}</div>
    </div>
  );
};

export default Rank;
