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

    if (!eachArtwork) {
        return <p>Loading artwork details...</p>
    }

    return (
        <article className="each-artwork">
            <img
                className="artwork-img"
                src={`https://www.artic.edu/iiif/2/${eachArtwork.image_id}/full/843,/0/default.jpg`}
                alt={eachArtwork.thumbnail.alt_text}
            />
            <p>{eachArtwork.title}</p>
            <p>Artist: {eachArtwork.artist_display}</p>
        </article>
    )
}

export default EachArtwork
