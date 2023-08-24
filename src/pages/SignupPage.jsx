import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import BACKEND_URL from "../utils/BACKEND_URL"
import "../styles/login-signup.css"
import logo from "../assets/logo.svg"
import check from "../assets/check.svg"

function SignupPage(props) {
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    })
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    const onInputChange = e => {
        const { name, value } = e.target
        setInput(prev => ({
            ...prev,
            [name]: value,
        }))
        validateInput(e)
    }

    const validateInput = e => {
        let { name, value } = e.target
        setErrorMessage(prev => {
            const stateObj = { ...prev, [name]: "" }

            switch (name) {
                case "name":
                    if (!value) {
                        stateObj[name] = "Please enter your name"
                    }
                    break

                case "email":
                    if (!value) {
                        stateObj[name] = "Please enter your email"
                    }
                    break

                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter a password"
                    }
                    break

                case "passwordConfirmation":
                    if (!value) {
                        stateObj[name] = "Please enter your password"
                    }
                    break

                default:
                    break
            }

            return stateObj
        })
    }

    const handleSignupSubmit = e => {
        e.preventDefault()
        const requestBody = { ...input }

        // If the POST request is successful, redirect to the login page
        axios
            .post(`${BACKEND_URL}/auth/signup`, requestBody)
            .then(response => {
                navigate("/login")
            })
            .catch(error => {
                const errorDescription = error.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <div id="signup-page">
            <Link className="navbar-bg" to="/">
                <img id="logo" src={logo} alt="ArtVerse logo" />
            </Link>
            <h1 className="login-signup-title">Hello you</h1>
            <form className="login-signup-form" onSubmit={handleSignupSubmit}>
                <div className="label-flex">
                    <label htmlFor="name">Name</label>
                    {errorMessage.name && (
                        <span className="error-message">{errorMessage.name}</span>
                    )}
                </div>
                <input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={onInputChange}
                    onBlur={validateInput}
                />

                <div className="label-flex">
                    <label htmlFor="email">Email address</label>
                    {errorMessage.email && (
                        <span className="error-message">{errorMessage.email}</span>
                    )}
                </div>
                <input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={onInputChange}
                    onBlur={validateInput}
                />

                <div className="label-flex">
                    <label htmlFor="password">Password</label>
                    {errorMessage.password && (
                        <span className="error-message">{errorMessage.password}</span>
                    )}
                    {input.password && input.passwordConfirmation === input.password && (
                        <img src={check} alt="Success" className="password-success-icon" />
                    )}
                </div>
                <input
                    type="password"
                    name="password"
                    value={input.password}
                    onChange={onInputChange}
                    onBlur={validateInput}
                />

                <div className="label-flex">
                    <label htmlFor="passwordConfirmation">Password confirmation</label>
                    {errorMessage.passwordConfirmation && (
                        <span className="error-message">{errorMessage.passwordConfirmation}</span>
                    )}
                    {input.password && input.passwordConfirmation === input.password && (
                        <img src={check} alt="Success" className="password-success-icon" />
                    )}
                </div>
                <input
                    type="password"
                    name="passwordConfirmation"
                    value={input.passwordConfirmation}
                    onChange={onInputChange}
                    onBlur={validateInput}
                />

                <div className="form-buttons">
                    <Link className="form-secondary-button" to="/login">
                        Already have an account?
                    </Link>
                    <button className="form-submit-button" type="submit">
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignupPage
