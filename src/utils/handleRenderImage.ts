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

type ValidTItem = Exclude<TItem, "">;

const imageMap: Record<ValidTItem, string> = {
    fire,
    air,
    brick,
    garden,
    dust,
    earth,
    energy,
    water,
    lava,
    mud,
    plant,
    pressure,
    rain,
    sea,
    steam,
    volcano,
};

export const handleRenderImage = (type: TItem) =>
    imageMap[type as ValidTItem] || volcano;
