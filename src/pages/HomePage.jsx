import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import EachArtwork from "../components/EachArtwork"

function HomePage() {
    const [artworks, setArtworks] = useState(null)

    useEffect(() => {
        axios
            .get("https://api.artic.edu/api/v1/artworks/search?q=modern&limit=100")
            .then(response => setArtworks(response.data.data))
            .catch(error => console.error(error.message))
    }, [])

    if (!artworks) {
        return <p>Loading artworks...</p>
    }

    return (
        <div>
            <Navbar />
            <div id="all-artworks">
                {artworks.map(artwork => (
                    <EachArtwork key={artwork.id} artwork={artwork} />
                ))}
            </div>
        </div>
    )
}

export default HomePage
