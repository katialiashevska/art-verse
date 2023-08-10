import React from "react"
import exit from "../assets/exit.svg"

function About({ onClose }) {
    return (
        <div id="about-overlay">
            <div id="about-header">
                <h1>About this project</h1>
                <img
                    className="about-exit-button round-button"
                    src={exit}
                    alt="Exit icon"
                    onClick={onClose}
                />
            </div>
            <p id="about-text">
                Hi! My name is Katia and I created this app during my 2023 Ironhack bootcamp in
                full-stack web development. I was inspired by{" "}
                <a
                    className="about-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://artsandculture.google.com/">
                    Google Arts & Culture
                </a>
                , which is an amazing plaform used by everybody working in the art field on a daily
                basis. Art-Verse allows you to view a catalogue of 100 modern art masterpieces from
                the collection of one of the world's major art museums,{" "}
                <a
                    className="about-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.artic.edu/">
                    The Art Institute of Chicago
                </a>
                , and create a list of favourites. Check out my{" "}
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
