import { IItem } from "./interface";
import { v4 as uuidv4 } from "uuid";

export const optionDefault: IItem[] = [
    {
        img: "public/air.png",
        name: "air",
        x: 0,
        y: 0,
        uuid: uuidv4(),
        isOption: true,
    },
    {
        img: "public/earth.png",
        name: "earth",
        x: 0,
        y: 0,
        uuid: uuidv4(),
        isOption: true,
    },
    {
        img: "public/fire.png",
        name: "fire",
        x: 0,
        y: 0,
        uuid: uuidv4(),
        isOption: true,
    },
    {
        img: "public/water.png",
        name: "water",
        x: 0,
        y: 0,
        uuid: uuidv4(),
        isOption: true,
    },
];
