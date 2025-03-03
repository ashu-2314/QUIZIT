import React from "react";
import "../styles/Leaderboard.css";

const Leaderboard = () => {
  const mockData = [
    { rank: 1, name: "Alice", score: 95 },
    { rank: 2, name: "Bob", score: 90 },
    { rank: 3, name: "Charlie", score: 85 },
  ];

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((player, index) => (
            <tr key={index}>
              <td>{player.rank}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
