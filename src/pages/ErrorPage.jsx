import React from "react"
import { Link } from "react-router-dom"
import "../styles/error-page.css"

function ErrorPage() {
    return (
        <div id="error-page">
            <h1 id="error-title">Oops, missing artworks!</h1>
            <Link id="error-back-button" to="/">
                Back to homepage
            </Link>
        </div>
    )
}

export default ErrorPage
