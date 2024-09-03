export interface IItem {
    uuid: string;
    img: string;
    name: TItem;
    x: number;
    y: number;
    isOption: boolean;
}

export type TItem =
    | ""
    | "air"
    | "fire"
    | "earth"
    | "water"
    | "dust"
    | "energy"
    | "lava"
    | "mud"
    | "rain"
    | "sea"
    | "steam"
    | "volcano"
    | "pressure"
    | "brick"
    | "plant"
    | "garden";

export type THeaderActive = "home" | "setting" | "achievement";
