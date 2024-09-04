import { useAppSelector } from "../../hooks/hooks";
import { TItem } from "../../utils/interface";
import { listText } from "../../utils/listText";
import "./ListText.css";

export default function ListText() {
    const listOption = useAppSelector((state) => state.optionSlice.optionSlice);
    const isDark = useAppSelector((state) => state.themeSlice.isDark);

    const handleScroll = (text: string) => {
        let isValid: boolean = false;
        let target: TItem = "";

        listOption.forEach((item) => {
            if (item.name.slice(0, 1) === text.toLowerCase()) {
                isValid = true;
                target = item.name;
            }
        });

        if (isValid) {
            document
                .querySelector(`.${target}`)
                ?.scrollIntoView({ behavior: "instant" });
        }
    };
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
            }}
        >
            {listText() &&
                listText().length > 0 &&
                listText().map((item, index) => {
                    return (
                        <div
                            className="item"
                            key={index}
                            style={{
                                padding: "10px",
                                opacity: "0.4",
                                color: `${
                                    isDark ? "var(--color-text-dark)" : ""
                                }`,
                            }}
                            onClick={() => handleScroll(item)}
                        >
                            {item}
                        </div>
                    );
                })}
        </div>
    );
}
