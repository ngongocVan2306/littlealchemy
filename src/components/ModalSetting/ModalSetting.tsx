import { memo, useState } from "react";
import "./ModalSetting.css";
import { THeaderActive } from "../../utils/interface";
import FormHome from "./FormHome/FormHome";
import FormSetting from "./FormSetting/FormSetting";
import FormAchievement from "./FormAchievement/FormAchievement";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";

const ModalSetting = memo(function ModalSetting({
    handleCloseModal,
}: {
    handleCloseModal: () => void;
}) {
    const [status, setStatus] = useState<THeaderActive>("home");

    const isDark = useAppSelector(
        (state: RootState) => state.themeSlice.isDark
    );

    return (
        <div
            className="modal-control"
            style={{
                background: `${isDark ? "#171319" : "#f7f1e7"}`,
                color: `${isDark ? "#9779A6" : ""}`,
            }}
        >
            <div className="header">
                <ul className="list-control">
                    <li
                        style={{
                            borderBottom: `${
                                status === "home" ? "4px solid #e8ded0" : ""
                            }`,
                        }}
                        onClick={() => setStatus("home")}
                    >
                        <div className="icon icon-home"></div>
                        Home
                    </li>

                    <li
                        style={{
                            borderBottom: `${
                                status === "setting" ? "4px solid #e8ded0" : ""
                            }`,
                        }}
                        onClick={() => setStatus("setting")}
                    >
                        <div className="icon icon-setting"></div> Settings
                    </li>

                    <li
                        style={{
                            borderBottom: `${
                                status === "achievement"
                                    ? "4px solid #e8ded0"
                                    : ""
                            }`,
                        }}
                        onClick={() => setStatus("achievement")}
                    >
                        <div className="icon icon-Achievement"></div>
                        Achievements
                    </li>
                </ul>
                <div
                    className="icon-close"
                    onClick={() => handleCloseModal()}
                ></div>
            </div>

            <div className="content">
                {status === "home" ? (
                    <FormHome />
                ) : status === "setting" ? (
                    <FormSetting />
                ) : (
                    <FormAchievement />
                )}
            </div>
        </div>
    );
});

export default ModalSetting;
