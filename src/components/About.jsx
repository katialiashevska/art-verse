import exit from "../assets/exit.svg"
import "../styles/about.css"
import { PressEscape } from "./PressEscape"

function About({ onClose }) {
    PressEscape(onClose)

    return (
        <div id="about-overlay">
            <div id="about-header">
                <img
                    className="about-exit-button round-button"
                    src={exit}
                    alt="Exit icon"
                    onClick={onClose}
                />
                <h1>About Art-Verse</h1>
            </div>
            <p id="about-text">
                Hello! I'm Katia and I created this full-stack app during my Ironhack bootcamp in
                2023. I was inspired by the incredible{" "}
                <a
                    className="about-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://artsandculture.google.com/">
                    Google&nbsp;Arts&nbsp;&&nbsp;Culture
                </a>{" "}
                platform, which has captured the hearts of art professionals and enthusiasts alike.
                Art-Verse grants you access to an extensive catalogue of modern art pieces from the
                collection of{" "}
                <a
                    className="about-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.artic.edu/">
                    The&nbsp;Art&nbsp;Institute&nbsp;of&nbsp;Chicago
                </a>
                . By signing up for an account, you can curate your personal list of favourites,
                truly making the experience your own. You are welcome to check out my{" "}
                <a
                    className="about-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/katialiashevska">
                    GitHub
                </a>{" "}
                for more stuff :)
            </p>
        </div>
    )
}

export default About
