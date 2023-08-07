import React, { useState, useEffect } from "react"
import axios from "axios"

function EachArtwork({ artwork }) {
    const [eachArtwork, setEachArtwork] = useState(null)
    let tooltip = document.querySelectorAll(".tooltip")

    useEffect(() => {
        axios
            .get(artwork.api_link)
            .then(response => setEachArtwork(response.data.data))
            .catch(error => console.error(error.message))
    }, [artwork.api_link])

    const tooltipMove = e => {
        for (let i = tooltip.length; i--; ) {
            tooltip[i].style.left = e.pageX + "px"
            tooltip[i].style.top = e.pageY + "px"
        }
    }

    document.addEventListener("mousemove", tooltipMove, false)

    if (!eachArtwork) {
        return <p>Loading artwork details...</p>
    }

    return (
        <article className="each-artwork">
            <div className="tooltip">
                <p className="artwork-title">{eachArtwork.title}</p>
                <p className="artwork-artist">{eachArtwork.artist_title}, {eachArtwork.date_display}</p>
            </div>
            <img
                className="artwork-img"
                src={`https://www.artic.edu/iiif/2/${eachArtwork.image_id}/full/843,/0/default.jpg`}
                alt={eachArtwork.thumbnail.alt_text}
            />
        </article>
    )
}

export default EachArtwork
