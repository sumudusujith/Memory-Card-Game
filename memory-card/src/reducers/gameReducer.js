import { generateCards } from "../utils/generateCards";

export const initialState = {
    cards: [],
    flippedCards: [],
    matches: 0,
    mismatches: 0,
    timeRemaining: 180,
    gameStatus: "idle",
    finalScore: 0,
};

export const gameReducer = (state, action) => {
    switch (action.type) {
        case "START_GAME":
            return {
                ...state,
                cards: generateCards(),
                gameStatus: "playing",
                timeRemaining: 180,
                matches: 0,
                mismatches: 0,
                finalScore: 0,
            };
        case "FLIP_CARD":
            if (
                state.flippedCards.length >= 2 ||
                state.cards.find((c) => c.id === action.payload)
            ) {
                return state;
            }
            const Updated = state.cards.map((card) =>
                card.id === action.payload ? { ...card, isFlipped: true } : card
            );
            return {
                ...state,
                cards: Updated,
                flippedCards: [...state.flippedCards, action.payload],
            };

        case "CHECK_MATCH":
            const [firstId, secondId] = state.flippedCards;
            const firstCard = state.cards.find((card) => card.id === firstId);
            const secondCard = state.cards.find((card) => card.id === secondId);

            if (firstCard && secondCard) {
                const isMatch =
                    firstCard.type === "wildcard" ||
                    secondCard.type === "wildcard" ||
                    firstCard.value === secondCard.value;

                if (firstCard.type === "trap" || secondCard.type === "trap") {
                    const resetMatchedCards = state.card.map((card) =>
                        card.isMatched
                            ? { ...card, isMatched: false, isFlipped: false }
                            : card
                    );
                    return {
                        ...state,
                        cards: resetMatchedCards,
                        flippedCards: [],
                        mismatches: state.mismatches + 1,
                    };
                }
                //update cards for match or mismatch
                const updatedCards = state.cards.map((card) =>
                    card.id === firstId || card.id === secondId
                        ? { ...card, isMatched: isMatch, isFlipped: false }
                        : card
                );

                //flip back unmatched cards after 1 second
                if (!isMatch) {
                    setTimeout(() => {
                        const resetCards = state.cards.map((card) =>
                            card.id === firstId || card.id === secondId
                                ? { ...card, isFlipped: false }
                                : card
                        );
                        state.cards = resetCards;
                    }, 1000);
                }
                return {
                    ...state,
                    cards: state.cards.map((card) =>
                        card.id === firstId || card.id === secondId
                            ? {
                                  ...card,
                                  isMatched: isMatch,
                                  isFlipped: isMatch,
                              }
                            : card
                    ),
                    flippedCards: [],
                    matches: isMatch ? state.matches + 1 : state.matches,
                    mismatches: isMatch
                        ? state.mismatches
                        : state.mismatches + 1,
                };
            }

            return state;

        case "TICK":
            return {
                ...state,
                timeRemaining: state.timeRemaining - 1,
                gameStatus:
                    state.timeRemaining - 1 <= 0
                        ? "isFinished"
                        : state.gameStatus,
            };
        case "END_GAME":
            const finalScore =
                state.matches * 100 -
                state.mismatches * 20 +
                state.timeRemaining;
            return {
                ...state,
                gameStatus: "finished",
                finalScore,
            };
        default:
            return state;
    }
};
