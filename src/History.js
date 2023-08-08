import React, { useState } from "react";
import './styling/App.css';


export default function HistoryList({ list }) {
  return (
    <div className="styled-list">
      {list.map((list) => (
        <li><img className="lineDimensions" src="Line.png" alt="im1"/>{list}</li>
      ))}
    </div>
  );
}

