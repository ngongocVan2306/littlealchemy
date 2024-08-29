import { TItem } from "./interface";
import fire from "../../public/fire.png";
import air from "../../public/air.png";
import brick from "../../public/brick.png";
import dust from "../../public/dust.png";
import earth from "../../public/earth.png";
import energy from "../../public/energy.png";
import garden from "../../public/garden.png";
import water from "../../public/water.png";
import lava from "../../public/lava.png";
import mud from "../../public/mud.png";
import plant from "../../public/plant.png";
import pressure from "../../public/pressure.png";
import rain from "../../public/rain.png";
import sea from "../../public/sea.png";
import steam from "../../public/steam.png";
import volcano from "../../public/volcano.png";

export const handleRenderImage = (type: TItem) => {
    switch (type) {
        case "fire":
            return fire;
        case "air":
            return air;
        case "brick":
            return brick;
        case "garden":
            return garden;
        case "dust":
            return dust;
        case "earth":
            return earth;
        case "energy":
            return energy;
        case "water":
            return water;
        case "lava":
            return lava;
        case "mud":
            return mud;
        case "plant":
            return plant;
        case "pressure":
            return pressure;
        case "rain":
            return rain;
        case "sea":
            return sea;
        case "steam":
            return steam;
        default:
            return volcano;
    }
};
