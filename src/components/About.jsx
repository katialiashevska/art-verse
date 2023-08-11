import { useEffect } from "react"
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
                Hi! My name is Katia and I created this app during my 2023 Ironhack bootcamp in
                full-stack web development. I was inspired by{" "}
                <a
                    className="about-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://artsandculture.google.com/">
                    Google&nbsp;Arts&nbsp;&&nbsp;Culture
                </a>
                , an amazing plaform used by everybody working in the art field on a daily basis.
                Art-Verse allows you to view a catalogue of 100 modern art masterpieces from the
                collection of{" "}
                <a
                    className="about-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.artic.edu/">
                    The&nbsp;Art&nbsp;Institute&nbsp;of&nbsp;Chicago
                </a>{" "}
                and create a list of favourites. Check out my{" "}
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
