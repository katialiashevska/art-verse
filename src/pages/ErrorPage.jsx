import { Link } from "react-router-dom"
import "../styles/error-page.css"
import logo from "../assets/logo.svg"
import error from "../assets/error.svg"

function ErrorPage() {
    return (
        <div id="error-page">
            <Link className="navbar-bg" to="/">
                <img id="logo" src={logo} alt="ArtVerse logo" />
            </Link>
            <h1 id="error-title">Oops, missing artworks!</h1>
            <Link id="error-back-button" to="/">
                Back to homepage
            </Link>
            <img id="error-image" src={error} alt="Error image" />
        </div>
    )
}

export default ErrorPage
