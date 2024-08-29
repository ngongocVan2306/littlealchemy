import { TItem } from "./interface";
import fire from "../../public/fire.png";
import air from "../../public/air.png";
import brick from "../../public/brick.png";
import clear from "../../public/clear.png";

export const handleRenderImage = (type: TItem) => {
    switch (type) {
        case "fire":
            return fire;
        case "air":
            return air;
        case "brick":
            return brick;
        default:
            return clear;
    }
};
