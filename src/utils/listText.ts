export const listText = (): string[] => {
    const arrText: string[] = [];
    for (let i = 65; i <= 90; i++) {
        arrText.push(String.fromCharCode(i));
    }

    return arrText;
};
