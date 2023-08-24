import { Link } from "react-router-dom"
import { useState, useContext } from "react"
import About from "./About"
import { AuthContext } from "../context/auth.context"
import "../styles/navbar.css"
import logo from "../assets/logo.svg"

function Navbar() {
    const { isLoggedIn, user } = useContext(AuthContext)

    // State to manage whether the "About" overlay is open or not
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
                {isLoggedIn && (
                    <Link className="navbar-button" to="/favourites">
                        My favourites
                    </Link>
                )}
                {!isLoggedIn && (
                    <Link className="navbar-button" to="/login">
                        Log in
                    </Link>
                )}
            </div>
            {aboutOpen && <About onClose={closeAbout} />}
        </div>
    )
}

export default Navbar
