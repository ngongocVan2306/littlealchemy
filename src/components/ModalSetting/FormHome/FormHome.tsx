import { useAppSelector } from "../../../hooks/hooks";
import facebook from "../../../../public/facebook.png";
import google from "../../../../public/google.png";
import twitter from "../../../../public/twitter.png";

export default function FormHome() {
    const isDark = useAppSelector((state) => state.themeSlice.isDark);
    return (
        <div
            className=""
            style={{
                padding: "10px",
                color: `${isDark ? "var(--color-text-dark)" : ""}`,
            }}
        >
            <h3 style={{ margin: "10px 0" }}>Newsletter</h3>
            <a
                href="https://littlealchemy.com/newsletter/"
                style={{ textDecoration: "none", color: "#938670" }}
            >
                Sign up for our newsletter and never miss an update again.
            </a>

            <h3 style={{ margin: "10px 0" }}>Social Media</h3>

            <p style={{ margin: "10px 0" }}>Follow us on social media!</p>

            <div
                className="social"
                style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                }}
            >
                <img
                    src={twitter}
                    alt="twiter"
                    style={{ width: "60px", marginRight: "20px" }}
                />
                <img
                    src={google}
                    alt="google"
                    style={{ width: "60px", marginRight: "20px" }}
                />
                <img
                    src={facebook}
                    alt="facebook"
                    style={{ width: "60px", marginRight: "20px" }}
                />
            </div>

            <h3 style={{ margin: "10px 0" }}>Contact</h3>

            <ul style={{ listStyleType: "none" }}>
                <li style={{ margin: "5px 0" }}>contact@littlealchemy.com</li>
                <li style={{ margin: "5px 0" }}>
                    <a
                        href="http://jakubkoziol.com/press/sheet.php?p=little_alchemy"
                        target="_blank"
                        style={{ textDecoration: "none", color: "#938670" }}
                    >
                        presskit
                    </a>
                </li>
            </ul>

            <h3 style={{ margin: "10px 0" }}>Team</h3>

            <p>
                A game by Jakub Koziol //
                <a
                    href="http://twitter.com/jakubkoziol"
                    target="_blank"
                    style={{ textDecoration: "none", color: "#938670" }}
                >
                    @jakubkoziol
                </a>
            </p>

            <p>
                Little Alchemy wouldn't be possible without the help from these
                fine folks:
            </p>

            <ul style={{ listStyleType: "none", marginTop: "10px" }}>
                <li style={{ margin: "5px 0" }}>Łukasz Nawrot - Code</li>
                <li style={{ margin: "5px 0" }}>
                    Marcin Bychawski - Code, Tools
                </li>
                <li style={{ margin: "5px 0" }}>Ewa Koziol - Icons</li>{" "}
                <li>Kamil Kubiak - QA</li>
            </ul>
        </div>
    );
}
