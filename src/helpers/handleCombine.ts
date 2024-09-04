import { IItem, TItem } from "../utils/interface";

const combinations: [string, string, TItem][] = [
    ["fire", "air", "energy"],
    ["fire", "earth", "lava"],
    ["fire", "water", "steam"],
    ["earth", "air", "dust"],
    ["earth", "water", "mud"],
    ["water", "air", "rain"],
    ["lava", "earth", "volcano"],
    ["fire", "mud", "brick"],
    ["rain", "earth", "plant"],
    ["air", "air", "pressure"],
    ["earth", "earth", "pressure"],
    ["water", "water", "sea"],
    ["plant", "plant", "garden"],
];

export const handleCombine = (itemState: IItem, action: IItem): TItem => {
    for (const item of combinations) {
        console.log("Run");
        if (
            (itemState.name === item[0] && action.name === item[1]) ||
            (itemState.name === item[1] && action.name === item[0])
        ) {
            return item[2];
        }
    }
    return "";
};
