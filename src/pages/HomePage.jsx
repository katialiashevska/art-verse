import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import EachArtwork from "../components/EachArtwork"

function HomePage() {
    const [artworks, setArtworks] = useState(null)
    let tooltip = document.querySelectorAll(".tooltip")

    useEffect(() => {
        axios
            .get("https://api.artic.edu/api/v1/artworks/search?q=modern&limit=100")
            .then(response => setArtworks(response.data.data))
            .catch(error => console.error(error.message))
    }, [])

    const tooltipMove = e => {
        for (let i = tooltip.length; i--; ) {
            tooltip[i].style.left = e.pageX + "px"
            tooltip[i].style.top = e.pageY + "px"
        }
    }

    document.addEventListener("mousemove", tooltipMove, false)

    if (!artworks) {
        return <p>Loading artworks...</p>
    }

    return (
        <div id="all-artworks">
            {artworks.map(artwork => (
                <EachArtwork key={artwork.id} artwork={artwork} />
            ))}
        </div>
    )
}

export default HomePage
