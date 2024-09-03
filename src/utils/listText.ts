const handleGetText = (): string[] => {
    const arrText: string[] = [];
    for (let i = 65; i <= 90; i++) {
        arrText.push(String.fromCharCode(i));
    }

    return arrText;
};

export const listText: string[] = handleGetText();
