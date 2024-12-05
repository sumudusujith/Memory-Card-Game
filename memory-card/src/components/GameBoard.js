import React from "react";
import { useGameLogic } from "../hooks/useGameLogic";
import Card from "./Card";
import ScoreTimer from "./ScoreTimer";
import "./GameBoard.css";

const GameBoard = () => {
    const { state, dispatch } = useGameLogic();

    return (
        <div className="game-wrapper">
            <h1>Memory Card Game</h1>
            <ScoreTimer
                timeRemaining={state.timeRemaining}
                matches={state.matches}
                mismatches={state.mismatches}
                finalScore={state.finalScore}
                gameStatus={state.gameStatus}
            />

            <div className="board-wrapper">
                {state.cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        onClick={() =>
                            dispatch({ type: "FLIP_CARD", payload: card.id })
                        }
                    />
                ))}
            </div>
            {state.gameStatus === "finished" && (
                <div className="game-over">
                    <h2>Game Over</h2>
                    <p>Final Score: {state.finalScore}</p>
                </div>
            )}
        </div>
    );
};

export default GameBoard;
