import { useState, useEffect } from "react"
import check from "../assets/check.svg"

// Toast component displays a temporary notification message
const Toast = ({ message }) => {
    // State to manage the visibility of the toast
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        // When the component mounts, set the toast as visible
        setVisible(true)

        // Hide the toast after 3 seconds
        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        // Cleanup function to clear the timer when the component unmounts
        return () => clearTimeout(timer)
    }, [])

    return visible ? (
        <div className="toast">
            {message}
            <img src={check} alt="Check icon" />
        </div>
    ) : null
}

export default Toast
