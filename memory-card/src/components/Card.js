import React from "react";
import "./Card.css";

const Card = ({ card, onClick }) => {
    const { isFlipped, isMatched, value } = card;

    return (
        <div
            className={`card-wrapper ${
                isFlipped || isMatched ? "flipped" : ""
            } ${card.type === "wildcard" ? "wildcard" : ""} ${
                card.type === "trap" ? "trap" : ""
            }`}
            onClick={onClick}
        >
            <div className="card-inner">
                <div className="card-front">
                    {isFlipped || isMatched ? value : ""}
                </div>
                <div className="card-back"></div>
            </div>
        </div>
    );
};
export default Card;
