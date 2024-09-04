import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { RootState } from "../../../store/store";
import { changeThame } from "../../../store/themeSlice";

export default function FormSetting() {
    const isDark = useAppSelector(
        (state: RootState) => state.themeSlice.isDark
    );
    const dispatch = useAppDispatch();

    const handleChangeTheme = (): void => {
        dispatch(changeThame());
    };

    return (
        <div className="" style={{ paddingTop: "20px" }}>
            <div
                className=""
                style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                }}
            >
                <input
                    type="checkbox"
                    style={{
                        padding: "100px",
                        width: "35px",
                        height: "35px",
                        marginRight: "10px",
                        background: `${isDark ? "var(--color-text-dark)" : ""}`,
                    }}
                    value={`${isDark}`}
                    onChange={() => handleChangeTheme()}
                />
                <label htmlFor="">Night mode</label>
            </div>
        </div>
    );
}
