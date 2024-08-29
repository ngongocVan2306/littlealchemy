import { TItem } from "./interface";
import fire from "../../public/fire.png";
import air from "../../public/air.png";
import brick from "../../public/brick.png";
import clear from "../../public/clear.png";
// import bacground from "../../public/background.png";
// import clear_night from "../../public/clear_night.png";
// import close from "../../public/close.png";
// import dust from "../../public/dust.png";
// import earth from "../../public/earth.png";
// import anergy from "../../public/energy.png";
// import facebook from "../../public/facebook.png";
// import fullScreen_night from "../../public/fullScreen_night.png";
// import fullScreen from "../../public/fullScreen.png";
// import garden from "../../public/garden.png";
// import google from "../../public/google.png";
// import home from "../../public/home.svg"

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
