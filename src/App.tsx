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
} from "./store/optionSlice";
import { handleSwapOption } from "./helpers/handleSwapOption";
import { useState } from "react";
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
    const listOption = handleSwapOption(
        useAppSelector((state: RootState) => state.optionSlice.optionSlice)
    );
    const result = useAppSelector(
        (state: RootState) => state.optionSlice.result
    );
    const listItem = useAppSelector(
        (state: RootState) => state.optionSlice.itemSlice
    );
    const isDark = useAppSelector(
        (state: RootState) => state.themeSlice.isDark
    );

    const dispatch = useAppDispatch();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleStop = (data: any, item: IItem, index: number): void => {
        const dataBuider: IItem = {
            img: item.img ? item.img : "",
            name: item.name ? item.name : "",
            uuid: item.isOption ? uuidv4() : item.uuid,
            isOption: item.isOption,
            x: item.isOption
                ? window.innerWidth -
                  (window.innerWidth * 0.15 + Math.abs(data.lastX))
                : data.lastX,

            y: !item.isOption
                ? data.lastY
                : data.lastY + (index * 4.5 + 1) * 20,
        };

        if (item.isOption) {
            dataBuider.isOption = false;
            dispatch(addItem(dataBuider));
            dispatch(reloadOption(item));
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

    const handleClear = (): void => {
        dispatch(clearItem());
    };

    const handleFullScreen = (): void => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    const handleCloseModal = (): void => {
        setIsOpen(false);
    };

    return (
        <div
            className="app"
            style={{ background: `${isDark ? "#171319" : ""}` }}
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

                    {listItem &&
                        listItem.length > 0 &&
                        listItem.map((item, index) => {
                            return (
                                <Draggable
                                    key={item.uuid}
                                    onStop={(_e, data) =>
                                        handleStop(data, item, index)
                                    }
                                    position={{ x: item.x, y: item.y }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            position: "absolute",
                                            cursor: "pointer",
                                        }}
                                        // onClick={() => handleCreateItem(item)}
                                    >
                                        <img
                                            className="item"
                                            src={handleRenderImage(item.name)}
                                            alt="item"
                                            title={item.name}
                                            style={{ width: "50px" }}
                                        />

                                        <p
                                            style={{
                                                color: `${
                                                    isDark ? "#9779A6" : ""
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
                        overflow: "auto",
                        paddingLeft: "20px",
                    }}
                >
                    {listOption &&
                        listOption.length > 0 &&
                        listOption.map((item, index) => {
                            return (
                                <Draggable
                                    key={item.uuid}
                                    onStop={(_e, data) =>
                                        handleStop(data, item, index)
                                    }
                                >
                                    <div
                                        key={item.uuid}
                                        className={`item ${item.name}`}
                                        style={{
                                            zIndex: "100",
                                            width: "100%",
                                            height: "50px",
                                        }}
                                    >
                                        <img
                                            src={handleRenderImage(item.name)}
                                            alt="item"
                                            style={{ width: "50px" }}
                                        />
                                        <p
                                            style={{
                                                color: `${
                                                    isDark ? "#9779A6" : ""
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

                <div
                    className="list-button"
                    style={{
                        position: "fixed",
                        right: "17%",
                        bottom: "20px",
                    }}
                >
                    <div
                        className="btn btn-level2"
                        onClick={() => {
                            window.location.href =
                                "https://littlealchemy2.com/";
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
