import { IItem } from "../utils/interface";

export const handleSwapOption = (data: IItem[]): IItem[] => {
    return [...data].sort((itemOne, itemTwo) =>
        itemOne.name.localeCompare(itemTwo.name)
    );
};
