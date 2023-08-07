import React from "react"
import logo from "../assets/logo.svg"
import { Link } from "react-router-dom"

function Navbar() {
    return (
        <div id="navbar">
            <button className="navbar-button">About this project</button>
            <Link to="/">
                <img id="logo" src={logo} alt="ArtVerse logo" />
            </Link>
            <Link className="navbar-button" to="/favourites">
                My favourites
            </Link>
        </div>
    )
}

export default Navbar
