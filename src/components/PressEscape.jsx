import { useEffect } from "react"

export function PressEscape(onEscape) {
    useEffect(() => {
        // Event listener to close the modal on Escape key
        const handleKeyPress = e => {
            if (e.key === "Escape") {
                onEscape()
            }
        }
        document.addEventListener("keydown", handleKeyPress)
        // Remove the event listener when the component unmounts
        return () => {
            document.removeEventListener("keydown", handleKeyPress)
        }
    }, [onEscape])
}
