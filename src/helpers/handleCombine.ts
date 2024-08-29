import { IItem, TItem } from "../utils/interface";

export const handleCombine = (itemState: IItem, action: IItem): TItem => {
    console.log(itemState.name, action.name);
    if (
        (itemState.name === "fire" || action.name === "fire") &&
        (itemState.name === "air" || action.name === "air")
    ) {
        return "energy";
    }

    if (
        (itemState.name === "fire" || action.name === "fire") &&
        (itemState.name === "earth" || action.name === "earth")
    ) {
        return "lava";
    }

    if (
        (itemState.name === "fire" || action.name === "fire") &&
        (itemState.name === "water" || action.name === "water")
    ) {
        return "steam";
    }

    if (
        (itemState.name === "earth" || action.name === "earth") &&
        (itemState.name === "air" || action.name === "air")
    ) {
        return "dust";
    }

    if (
        (itemState.name === "earth" || action.name === "earth") &&
        (itemState.name === "water" || action.name === "water")
    ) {
        return "mud";
    }

    if (
        (itemState.name === "water" || action.name === "water") &&
        (itemState.name === "air" || action.name === "air")
    ) {
        return "rain";
    }

    if (
        (itemState.name === "lava" || action.name === "lava") &&
        (itemState.name === "earth" || action.name === "earth")
    ) {
        return "volcano";
    }

    if (
        (itemState.name === "fire" || action.name === "fire") &&
        (itemState.name === "mud" || action.name === "mud")
    ) {
        return "brick";
    }

    if (
        (itemState.name === "rain" || action.name === "rain") &&
        (itemState.name === "earth" || action.name === "earth")
    ) {
        return "plant";
    }

    if (
        (itemState.name === "air" && action.name === "air") ||
        (itemState.name === "earth" && action.name === "earth")
    ) {
        return "pressure";
    }

    if (itemState.name === "water" && action.name === "water") {
        return "sea";
    }

    if (itemState.name === "plant" && action.name === "plant") {
        return "garden";
    }

    return "";
};
