export const generateCards = () => {
    const regularCards = [
        { value: "JavaScript", type: "regular" },
        { value: "JavaScript", type: "regular" },
        { value: "JavaScript", type: "regular" },
        { value: "JavaScript", type: "regular" },
        { value: "JavaScript", type: "regular" },
        { value: "JavaScript", type: "regular" },
        { value: "JavaScript", type: "regular" },
        { value: "JavaScript", type: "regular" },
    ];

    const specialCards = [
        { value: "WildCard", type: "wildcard" },
        { value: "Trap", type: "trap" },
    ];

    const allCards = [
        ...regularCards.flatMap((card) => [
            { id: Math.random(), ...card, isFlipped: false, isMatched: false },
            { id: Math.random(), ...card, isFlipped: false, isMatched: false },
        ]),

        ...specialCards.map((card) => ({
            id: Math.random(),
            ...card,
            isFlipped: false,
            isMatched: false,
        })),
    ];
    return allCards.sort(() => Math.random() - 0.5);
};
