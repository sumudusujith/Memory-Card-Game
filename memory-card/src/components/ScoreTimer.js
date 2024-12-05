import React from "react";

const ScoreTimer = ({
    timeRemaining,
    matches,
    mismatches,
    finalScore,
    gameStatus,
}) => {
    const calculatedScore =
        gameStatus === "finished"
            ? finalScore
            : matches * 100 - mismatches * 20;

    return (
        <div className="score-timer-wrapper">
            <div className="score">Score: {calculatedScore}</div>
            <div className="timer">Time Remaining : {timeRemaining}</div>
        </div>
    );
};

export default ScoreTimer;
