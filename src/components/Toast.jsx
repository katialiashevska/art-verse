import { useState, useEffect } from "react"
import check from "../assets/check.svg"

const Toast = ({ message }) => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

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
