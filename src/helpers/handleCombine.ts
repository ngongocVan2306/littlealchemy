// import { IItem, TItem } from "../utils/interface";

import { IItem, TItem } from "../utils/interface";

// export const handleCombine = (itemState: IItem, action: IItem): TItem => {
//     if (
//         (itemState.name === "fire" || action.name === "fire") &&
//         (itemState.name === "air" || action.name === "air")
//     ) {
//         return "energy";
//     }

//     if (
//         (itemState.name === "fire" || action.name === "fire") &&
//         (itemState.name === "earth" || action.name === "earth")
//     ) {
//         return "lava";
//     }

//     if (
//         (itemState.name === "fire" || action.name === "fire") &&
//         (itemState.name === "water" || action.name === "water")
//     ) {
//         return "steam";
//     }

//     if (
//         (itemState.name === "earth" || action.name === "earth") &&
//         (itemState.name === "air" || action.name === "air")
//     ) {
//         return "dust";
//     }

//     if (
//         (itemState.name === "earth" || action.name === "earth") &&
//         (itemState.name === "water" || action.name === "water")
//     ) {
//         return "mud";
//     }

//     if (
//         (itemState.name === "water" || action.name === "water") &&
//         (itemState.name === "air" || action.name === "air")
//     ) {
//         return "rain";
//     }

//     if (
//         (itemState.name === "lava" || action.name === "lava") &&
//         (itemState.name === "earth" || action.name === "earth")
//     ) {
//         return "volcano";
//     }

//     if (
//         (itemState.name === "fire" || action.name === "fire") &&
//         (itemState.name === "mud" || action.name === "mud")
//     ) {
//         return "brick";
//     }

//     if (
//         (itemState.name === "rain" || action.name === "rain") &&
//         (itemState.name === "earth" || action.name === "earth")
//     ) {
//         return "plant";
//     }

//     if (
//         (itemState.name === "air" && action.name === "air") ||
//         (itemState.name === "earth" && action.name === "earth")
//     ) {
//         return "pressure";
//     }

//     if (itemState.name === "water" && action.name === "water") {
//         return "sea";
//     }

//     if (itemState.name === "plant" && action.name === "plant") {
//         return "garden";
//     }

//     return "";
// };

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
