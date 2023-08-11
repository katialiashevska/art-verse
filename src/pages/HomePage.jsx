import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import EachArtwork from "../components/EachArtwork"
import "../styles/navbar.css"
import "../styles/loading.css"
import "../styles/artworks.css"

function HomePage() {
    const [artworks, setArtworks] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios
            .get("https://api.artic.edu/api/v1/artworks/search?q=modern&limit=100")
            .then(response => {
                // Simulate loading with a timeout (optional)
                setTimeout(() => {
                    setArtworks(response.data.data)
                    setIsLoading(false)
                }, 5000) // Simulate loading time (5 seconds)
            })
            .catch(error => {
                console.error(error.message)
                setIsLoading(false)
            })
    }, [])

    return (
        artworks && (
            <div>
                <Navbar />
                {isLoading && (
                    <div id="loading-container">
                        <p id="loading-text">Loading artworks</p>
                        <div id="progress-bar"></div>
                    </div>
                )}
                {!isLoading && (
                    <div id="all-artworks">
                        {artworks.map(artwork => (
                            <EachArtwork key={artwork.id} artwork={artwork} />
                        ))}
                    </div>
                )}
            </div>
        )
    )
}

export default HomePage
