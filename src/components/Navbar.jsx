import logo from "../assets/logo.svg"
import { Link } from "react-router-dom"
import { useState } from "react"
import About from "./About"

function Navbar() {
    const [aboutOpen, setAboutOpen] = useState(false)

    const openAbout = () => {
        setAboutOpen(true)
    }

    const closeAbout = () => {
        setAboutOpen(false)
    }

    return (
        <div className="navbar-bg">
            <div id="navbar">
                <button className="navbar-button" onClick={openAbout}>
                    About this project
                </button>
                <Link to="/">
                    <img id="logo" src={logo} alt="ArtVerse logo" />
                </Link>
                <Link className="navbar-button" to="/favourites">
                    My favourites
                </Link>
            </div>
            {aboutOpen && <About onClose={closeAbout} />}
        </div>
    )
}

export default Navbar
