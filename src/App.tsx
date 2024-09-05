import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
// import Draggable from "react-draggable";
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
import { DragEvent, TouchEvent, useEffect, useState } from "react";
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

interface IPosition {
    currentX: number;
    currentY: number;
}

function App() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isChange, setIsChange] = useState<boolean>(false);
    const [dragging, setDragging] = useState<boolean>(false);
    const [currentPosition, setCurrentPosition] = useState<IPosition>({
        currentX: 0,
        currentY: 0,
    });

    const { result, itemSlice, optionSlice } = useAppSelector(
        (state: RootState) => state.optionSlice
    );
    const listOption: IItem[] = handleSwapOption(optionSlice);
    const isDark: boolean = useAppSelector(
        (state: RootState) => state.themeSlice.isDark
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        const arrOptionNew: IItem[] = [];

        listOption.map((item: IItem) => {
            const positionOption = document
                ?.getElementById(`${item.name}`)
                ?.getBoundingClientRect();

            const dataBuider: IItem = {
                ...item,
                x: positionOption?.x ?? 0,
                y: positionOption?.y ?? 0,
            };

            arrOptionNew.push(dataBuider);
        });

        dispatch(updatePositionOption(arrOptionNew));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChange]);

    // react-draggable

    // const handleStop = (data: any, item: IItem): void => {
    //     const dataBuider: IItem = {
    //         name: item.name,
    //         uuid: item.isOption ? uuidv4() : item.uuid,
    //         isOption: item.isOption ? false : true,
    //         x: item.isOption ? data.lastX + item.x : data.lastX,
    //         y: item.isOption ? data.lastY + item.y : data.lastY,
    //     };

    //     if (item.isOption) {
    //         dispatch(addItem(dataBuider));
    //         dispatch(reloadOption(item));
    //         setIsChange(!isChange);
    //     }

    //     dispatch(dragItem(dataBuider));
    // };

    // build thg
    // mouse

    const handleMove = (item: IItem) => {
        const dataBuider: IItem = {
            name: item.name,
            uuid: item.isOption ? uuidv4() : item.uuid,
            isOption: false,
            x: currentPosition.currentX,
            y: currentPosition.currentY,
        };

        if (item.isOption) {
            dispatch(addItem(dataBuider));
            dispatch(reloadOption(item));
            setIsChange(!isChange);
        }

        dispatch(dragItem(dataBuider));
        setCurrentPosition({
            currentX: 0,
            currentY: 0,
        });
    };

    const handleDrag = (data: DragEvent<HTMLDivElement>, item: IItem) => {
        if (data.clientX !== 0 || data.clientY !== 0) {
            setCurrentPosition({
                currentX: data.clientX,
                currentY: data.clientY,
            });
            return;
        }
        handleMove(item);
    };

    // Touch

    const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
        const touch = event.touches[0];
        setDragging(true);
        setCurrentPosition({
            currentX: touch.clientX,
            currentY: touch.clientY,
        });
    };

    const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
        if (dragging) {
            const touch = event.touches[0];
            setCurrentPosition({
                currentX: touch.clientX,
                currentY: touch.clientY,
            });
        }
    };

    const handleTouchEnd = (item: IItem) => {
        handleMove(item);
        setDragging(false);
    };

    // handle button

    const handleFullScreen = (): void => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    const handleClear = (): void => {
        dispatch(clearItem());
        setIsChange(!isChange);
    };

    const handleCloseModal = (): void => {
        setIsOpen(false);
    };

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
                                <div
                                    key={item.uuid}
                                    id={`${item.uuid}`}
                                    className="list-item"
                                    onDrag={(e) => handleDrag(e, item)}
                                    style={{
                                        left: `${item.x}px`,
                                        top: `${item.y}px`,
                                        touchAction: "none",
                                    }}
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={() => handleTouchEnd(item)}
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
                                            margin: "0px",
                                        }}
                                    >
                                        {item.name}
                                    </p>
                                </div>
                                // <Draggable
                                //     key={item.uuid}
                                //     onStop={(_e, data) =>
                                //         handleStop(data, item)
                                //     }
                                //     position={{ x: item.x, y: item.y }}
                                //     // onDrag={(data) => handleTest(data, item)}
                                // >
                                //     <div className="list-item">
                                //         <img
                                //             className="item"
                                //             src={handleRenderImage(item.name)}
                                //             alt="item"
                                //             title={item.name}
                                //         />

                                //         <p
                                //             style={{
                                //                 color: `${
                                //                     isDark
                                //                         ? "var(--color-text-dark)"
                                //                         : undefined
                                //                 }`,
                                //             }}
                                //         >
                                //             {item.name}
                                //         </p>
                                //     </div>
                                // </Draggable>
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
                                <div
                                    key={item.uuid}
                                    id={`${item.name}`}
                                    className={`item ${item.name}`}
                                    onDrag={(e) => handleDrag(e, item)}
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={() => handleTouchEnd(item)}
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
                                // <Draggable
                                //     key={item.uuid}
                                //     onStop={(_e, data) =>
                                //         handleStop(data, item)
                                //     }
                                //     // onDrag={(data) => handleTest(data, item)}
                                // >
                                //     <div
                                //         key={item.uuid}
                                //         id={`${item.name}`}
                                //         className={`item ${item.name}`}
                                //     >
                                //         <img
                                //             src={handleRenderImage(item.name)}
                                //             alt="item"
                                //         />
                                //         <p
                                //             style={{
                                //                 color: `${
                                //                     isDark
                                //                         ? "var(--color-text-dark)"
                                //                         : ""
                                //                 }`,
                                //             }}
                                //         >
                                //             {item.name}
                                //         </p>
                                //     </div>
                                // </Draggable>
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
