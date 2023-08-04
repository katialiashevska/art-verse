import React, { useState, useEffect } from "react"
import axios from "axios"

function EachArtwork({ artwork }) {
    const [eachArtwork, setEachArtwork] = useState(null)

    useEffect(() => {
        axios
            .get(artwork.api_link)
            .then(response => setEachArtwork(response.data.data))
            .catch(error => console.error(error.message))
    }, [artwork.api_link])

    const tooltip = event => {
        let x = event.clientX
        let y = event.clientY
        document.getElementById("tooltip").style.left = x + "px"
        document.getElementById("tooltip").style.top = y + "px"
    }

    if (!eachArtwork) {
        return <p>Loading artwork details...</p>
    }

    return (
        <article className="each-artwork" onMouseMove={tooltip}>
            <div id="tooltip">
                <p>{eachArtwork.title}</p>
                <p>{eachArtwork.artist_title}</p>
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
