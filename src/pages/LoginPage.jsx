import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import BACKEND_URL from "../utils/BACKEND_URL";
import "../styles/login-signup.css"
import logo from "../assets/logo.svg"

function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmailInput = e => setEmail(e.target.value)
    const handlePasswordInput = e => setPassword(e.target.value)

    return (
        <div id="login-page">
            <Link className="navbar-bg" to="/">
                <img id="logo" src={logo} alt="ArtVerse logo" />
            </Link>
            <h1 className="login-signup-title">Welcome back</h1>
            <form className="login-signup-form" action="">
                <label htmlFor="email">Email address</label>
                <input type="email" name="email" value={email} onChange={handleEmailInput} />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordInput}
                />

                <div className="form-buttons">
                    <Link className="form-secondary-button" to="/signup">
                        New here? Sign up
                    </Link>
                    <button className="form-submit-button" type="submit">
                        Log in
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
