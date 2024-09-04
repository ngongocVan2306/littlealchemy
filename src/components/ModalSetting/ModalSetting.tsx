import { memo, useState } from "react";
import "./ModalSetting.css";
import { THeaderActive } from "../../utils/interface";
import FormHome from "./FormHome/FormHome";
import FormSetting from "./FormSetting/FormSetting";
import FormAchievement from "./FormAchievement/FormAchievement";
import { useAppSelector } from "../../hooks/hooks";
import { RootState } from "../../store/store";
// import iconHome from "../../../public/home.svg";
// import iconStar from "../../../public/star.svg";
// import iconSetting from "../../../public/setting.svg";
import iconClose from "../../../public/close.png";

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
                background: `${
                    isDark
                        ? "var(--background-dark)"
                        : "var(--background-modal-light)"
                }`,
                color: `${isDark ? "var(--color-text-dark)" : ""}`,
            }}
        >
            <div className="header">
                <ul className="list-control">
                    <li
                        style={{
                            borderBottom: `${
                                status === "home"
                                    ? "4px solid var(--color-active)"
                                    : ""
                            }`,
                        }}
                        onClick={() => setStatus("home")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 48 48"
                        >
                            <path
                                d="M20 40V28h8v12h10V24h6L24 6 4 24h6v16z"
                                fill="#75005D"
                            />
                            <path d="M0 0h48v48H0z" fill="none" />
                        </svg>
                        Home
                    </li>

                    <li
                        style={{
                            borderBottom: `${
                                status === "setting"
                                    ? "4px solid var(--color-active)"
                                    : ""
                            }`,
                        }}
                        onClick={() => setStatus("setting")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 48 48"
                        >
                            <path d="M0 0h48v48H0z" fill="none" />
                            <path
                                d="M38.86 25.95c.08-.64.14-1.29.14-1.95s-.06-1.31-.14-1.95l4.23-3.31c.38-.3.49-.84.24-1.28l-4-6.93c-.25-.43-.77-.61-1.22-.43l-4.98 2.01c-1.03-.79-2.16-1.46-3.38-1.97L29 4.84c-.09-.47-.5-.84-1-.84h-8c-.5 0-.91.37-.99.84l-.75 5.3c-1.22.51-2.35 1.17-3.38 1.97L9.9 10.1c-.45-.17-.97 0-1.22.43l-4 6.93c-.25.43-.14.97.24 1.28l4.22 3.31C9.06 22.69 9 23.34 9 24s.06 1.31.14 1.95l-4.22 3.31c-.38.3-.49.84-.24 1.28l4 6.93c.25.43.77.61 1.22.43l4.98-2.01c1.03.79 2.16 1.46 3.38 1.97l.75 5.3c.08.47.49.84.99.84h8c.5 0 .91-.37.99-.84l.75-5.3c1.22-.51 2.35-1.17 3.38-1.97l4.98 2.01c.45.17.97 0 1.22-.43l4-6.93c.25-.43.14-.97-.24-1.28l-4.22-3.31zM24 31c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"
                                fill="#75005D"
                            />
                        </svg>
                        Settings
                    </li>

                    <li
                        style={{
                            borderBottom: `${
                                status === "achievement"
                                    ? "4px solid var(--color-active)"
                                    : ""
                            }`,
                        }}
                        onClick={() => setStatus("achievement")}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                        >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                fill="#75005D"
                            />
                            <path d="M0 0h24v24H0z" fill="none" />
                        </svg>
                        Achievements
                    </li>
                </ul>

                <div
                    className="icon-close"
                    onClick={() => handleCloseModal()}
                    style={{ backgroundImage: `url(${iconClose})` }}
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
