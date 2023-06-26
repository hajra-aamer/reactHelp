import React from "react";
import './App.css';


export default function HistoryList({ list }) {
console.log('list is now in function', list)
  return (
    <div className="styled-list">
      {list.map((list) => (
        <li>{list}</li>
      ))}
    </div>
  );
}

