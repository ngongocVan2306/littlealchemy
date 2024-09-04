import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Draggable from "react-draggable";
import { IItem } from "./utils/interface";
import { v4 as uuidv4 } from "uuid";
import {
    addItem,
    clearItem,
    dragItem,
    reloadOption,
    updatePositionOption,
} from "./store/optionSlice";
import { handleSwapOption } from "./helpers/handleSwapOption";
import { useEffect, useState } from "react";
import ModalSetting from "./components/ModalSetting/ModalSetting";
import { RootState } from "./store/store";
import background from "../public/background.png";
import fullScreen from "../public/fullScreen.png";
import fullScreenNight from "../public/fullScreen_night.png";
import menu from "../public/menu.png";
import menuNight from "../public/menu_night.png";
import { handleRenderImage } from "./utils/handleRenderImage";
import sibar from "../public/sibar.png";
import levelTow from "../public/level2.png";
import leveTwoNight from "../public/level2_night.png";
import clear from "../public/clear.png";
import clearNight from "../public/clear_night.png";
import ListText from "./components/ListText/ListText";

function App() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isChange, setIsChange] = useState<boolean>(false);

    const isDark: boolean = useAppSelector(
        (state: RootState) => state.themeSlice.isDark
    );
    const listOption: IItem[] = handleSwapOption(
        useAppSelector((state: RootState) => state.optionSlice.optionSlice)
    );
    const { result, itemSlice } = useAppSelector(
        (state: RootState) => state.optionSlice
    );

    const dispatch = useAppDispatch();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleStop = (data: any, item: IItem): void => {
        const dataBuider: IItem = {
            name: item.name,
            uuid: item.isOption ? uuidv4() : item.uuid,
            isOption: item.isOption ? false : true,
            x: item.isOption ? data.lastX + item.x : data.lastX,
            y: item.isOption ? data.lastY + item.y : data.lastY,
        };

        console.log(dataBuider);

        if (item.isOption) {
            dispatch(addItem(dataBuider));
            dispatch(reloadOption(item));
            setIsChange(!isChange);
        }

        dispatch(dragItem(dataBuider));
    };

    // const handleCreateItem = (data: IItem): void => {
    //     const uuid = uuidv4();
    //     dispatch(
    //         addItem({
    //             img: data.img,
    //             name: data.name,
    //             uuid: uuid,
    //             x: data.x,
    //             y: data.y,
    //             isOption: false,
    //         })
    //     );
    // };

    const handleFullScreen = (): void => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    const handleClear = (): void => {
        dispatch(clearItem());
    };

    const handleCloseModal = (): void => {
        setIsOpen(false);
    };

    useEffect(() => {
        const arrOptionNew: IItem[] = [];

        listOption.map((item: IItem) => {
            const dataBuider: IItem = {
                ...item,
                x:
                    document
                        .getElementById(`${item.name}`)
                        ?.getBoundingClientRect().x ?? 0,
                y:
                    document
                        .getElementById(`${item.name}`)
                        ?.getBoundingClientRect().y ?? 0,
            };

            arrOptionNew.push(dataBuider);
        });

        dispatch(updatePositionOption(arrOptionNew));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChange]);

    return (
        <div
            className="app"
            style={{ background: `${isDark ? "var(--background-dark)" : ""}` }}
        >
            <div
                className="div-scroll"
                style={{
                    backgroundImage: `${isDark ? "" : `url(${sibar})`}`,
                }}
            >
                <ListText />
            </div>

            <div className={`${isOpen ? "modal" : "none"}`}>
                <ModalSetting handleCloseModal={handleCloseModal} />
            </div>

            <div className="layout">
                <div
                    className="col-left"
                    style={{
                        position: "relative",
                        backgroundImage: `${
                            isDark ? "" : `url(${background})`
                        }`,
                    }}
                >
                    <div
                        className="btn-fullScreen"
                        onClick={() => handleFullScreen()}
                        style={{
                            backgroundImage: `url(${
                                isDark ? fullScreenNight : fullScreen
                            })`,
                        }}
                    ></div>

                    {itemSlice &&
                        itemSlice.length > 0 &&
                        itemSlice.map((item) => {
                            return (
                                <Draggable
                                    key={item.uuid}
                                    onStop={(_e, data) =>
                                        handleStop(data, item)
                                    }
                                    position={{ x: item.x, y: item.y }}
                                >
                                    <div
                                        className="list-item"
                                        // onClick={() => handleCreateItem(item)}
                                    >
                                        <img
                                            className="item"
                                            src={handleRenderImage(item.name)}
                                            alt="item"
                                            title={item.name}
                                        />

                                        <p
                                            style={{
                                                color: `${
                                                    isDark
                                                        ? "var(--color-text-dark)"
                                                        : undefined
                                                }`,
                                            }}
                                        >
                                            {item.name}
                                        </p>
                                    </div>
                                </Draggable>
                            );
                        })}

                    <p className="result">{result}/580</p>
                </div>

                <div
                    className="col-right"
                    style={{
                        backgroundImage: `${isDark ? "" : `url(${sibar})`}`,
                    }}
                    onScroll={() => setIsChange(!isChange)}
                >
                    {listOption &&
                        listOption.length > 0 &&
                        listOption.map((item) => {
                            return (
                                <Draggable
                                    key={item.uuid}
                                    onStop={(_e, data) =>
                                        handleStop(data, item)
                                    }
                                >
                                    <div
                                        key={item.uuid}
                                        id={`${item.name}`}
                                        className={`item ${item.name}`}
                                    >
                                        <img
                                            src={handleRenderImage(item.name)}
                                            alt="item"
                                        />
                                        <p
                                            style={{
                                                color: `${
                                                    isDark
                                                        ? "var(--color-text-dark)"
                                                        : ""
                                                }`,
                                            }}
                                        >
                                            {item.name}
                                        </p>
                                    </div>
                                </Draggable>
                            );
                        })}
                </div>

                <div className="list-button">
                    <div
                        className="btn btn-level2"
                        onClick={() => {
                            window.open("https://littlealchemy2.com/");
                        }}
                        style={{
                            backgroundImage: `url(${
                                isDark ? leveTwoNight : levelTow
                            })`,
                        }}
                    ></div>

                    <div
                        className="btn btn-clear"
                        onClick={() => handleClear()}
                        style={{
                            backgroundImage: `url(${
                                isDark ? clearNight : clear
                            })`,
                        }}
                    ></div>

                    <div
                        className="btn btn-menu"
                        style={{
                            backgroundImage: `url(${
                                isDark ? menuNight : menu
                            })`,
                        }}
                        onClick={() => setIsOpen(true)}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default App;
