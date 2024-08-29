import "./App.css";
import ListText from "./components/ListText/ListText";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Draggable from "react-draggable";
import { IItem } from "./utils/interface";
import { v4 as uuidv4 } from "uuid";
import { addItem, clearItem, dragItem } from "./store/optionSlice";
import { handleSwapOption } from "./helpers/handleSwapOption";
import { useState } from "react";
import ModalSetting from "./components/ModalSetting/ModalSetting";
import { RootState } from "./store/store";

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
    const handleStop = (data: any, item: Partial<IItem>): void => {
        const dataBuider: IItem = {
            img: item.img ? item.img : "",
            name: item.name ? item.name : "",
            uuid: item.uuid ? item.uuid : "",
            x: data.lastX,
            y: data.lastY,
        };

        dispatch(dragItem(dataBuider));
    };

    const handleCreateItem = (data: Partial<IItem>): void => {
        const uuid = uuidv4();
        dispatch(
            addItem({
                img: data.img ? data.img : "",
                name: data.name ? data.name : "",
                uuid: uuid,
                x: 0,
                y: 0,
            })
        );
    };

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
            <div className={`${isOpen ? "modal" : "none"}`}>
                <ModalSetting handleCloseModal={handleCloseModal} />
            </div>
            <div className="layout">
                <div
                    className="col-left"
                    style={{
                        position: "relative",
                        backgroundImage: `${
                            isDark ? "" : "url(../public/background.png)"
                        }`,
                    }}
                >
                    <div
                        className="btn-fullScreen"
                        onClick={() => handleFullScreen()}
                        style={{
                            backgroundImage: `url(${
                                isDark
                                    ? "../public/fullScreen_night.png"
                                    : "../public/fullScreen.png"
                            })`,
                        }}
                    ></div>

                    {listItem &&
                        listItem.length > 0 &&
                        listItem.map((item) => {
                            return (
                                <Draggable
                                    key={item.uuid}
                                    onStop={(data) => handleStop(data, item)}
                                    position={{ x: item.x, y: item.y }}
                                >
                                    <div
                                        className=""
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            position: "absolute",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <img
                                            className="item"
                                            src={`../${item.img}`}
                                            alt="item"
                                            title={item.name}
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
                        backgroundImage: `${
                            isDark ? "" : "url(../public/sibar.png)"
                        }`,
                    }}
                >
                    <div className="list-char">
                        <ListText />
                    </div>

                    <div className="list-option">
                        {listOption &&
                            listOption.length > 0 &&
                            listOption.map((item) => {
                                return (
                                    <div
                                        key={item.uuid}
                                        className={`item ${item.name}`}
                                        style={{ zIndex: "100" }}
                                        onClick={() => handleCreateItem(item)}
                                    >
                                        <img
                                            src={`../${item.img}`}
                                            alt="item"
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
                                );
                            })}
                    </div>
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
                                isDark
                                    ? "../public/level2_night.png"
                                    : "../public/level2.png"
                            })`,
                        }}
                    ></div>

                    <div
                        className="btn btn-clear"
                        onClick={() => handleClear()}
                        style={{
                            backgroundImage: `url(${
                                isDark
                                    ? "../public/clear_night.png"
                                    : "../public/clear.png"
                            })`,
                        }}
                    ></div>

                    <div
                        className="btn btn-menu"
                        style={{
                            backgroundImage: `url(${
                                isDark
                                    ? "../public/menu_night.png"
                                    : "../public/menu.png"
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
