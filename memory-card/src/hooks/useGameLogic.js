import { gameReducer, initialState } from "../reducers/gameReducer";
import { useEffect, useReducer } from "react";

export const useGameLogic = () => {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    useEffect(() => {
        dispatch({ type: "START_GAME" });
    }, []);

    useEffect(() => {
        if (state.flippedCards.length === 2) {
            dispatch({ type: "CHECK_MATCH" });
        }
    }, [state.flippedCards]);

    //timer
    useEffect(() => {
        const timer = setInterval(() => {
            dispatch({ type: "TICK" });
        }, 1000);

        //clear timer

        if (state.timeRemaining <= 0) {
            clearInterval(timer);
            dispatch({ type: "END_GAME" });
        }
        return () => clearInterval(timer);
    }, [state.timeRemaining]);

    return { state, dispatch };
};
