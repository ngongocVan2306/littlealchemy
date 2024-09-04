import { IItem } from "./interface";
import { v4 as uuidv4 } from "uuid";

export const optionDefault: IItem[] = [
    {
        name: "air",
        x: 0,
        y: 0,
        uuid: uuidv4(),
        isOption: true,
    },
    {
        name: "earth",
        x: 0,
        y: 0,
        uuid: uuidv4(),
        isOption: true,
    },
    {
        name: "fire",
        x: 0,
        y: 0,
        uuid: uuidv4(),
        isOption: true,
    },
    {
        name: "water",
        x: 0,
        y: 0,
        uuid: uuidv4(),
        isOption: true,
    },
];
