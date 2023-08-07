import React, { useState, useEffect } from "react"
import axios from "axios"
import plus from "../assets/plus.svg"

function EachArtwork({ artwork }) {
    const [eachArtwork, setEachArtwork] = useState(null)
    let tooltip = document.querySelectorAll(".tooltip")

    const tooltipMove = e => {
        for (let i = tooltip.length; i--; ) {
            tooltip[i].style.left = e.pageX + "px"
            tooltip[i].style.top = e.pageY + "px"
        }
    }

    document.addEventListener("mousemove", tooltipMove, false)

    useEffect(() => {
        axios
            .get(artwork.api_link)
            .then(response => setEachArtwork(response.data.data))
            .catch(error => console.error(error.message))
    }, [artwork.api_link])

    const addToFavourites = () => {
        const newArtwork = {
            title: eachArtwork.title,
            artist: eachArtwork.artist_title,
            date: eachArtwork.date_display,
            medium: eachArtwork.medium_display,
            dimensions: eachArtwork.dimensions,
            img: `https://www.artic.edu/iiif/2/${eachArtwork.image_id}/full/843,/0/default.jpg`,
            alt_text: eachArtwork.thumbnail.alt_text,
        }

        axios
            .post("https://art-verse-backend.adaptable.app/favouriteArtworks", newArtwork)
            .then(() => {
                alert("Artwork added to favorites!")
            })
            .catch(error => {
                console.error(error.message)
                alert("Failed to add artwork to favorites.")
            })
    }

    return (
        eachArtwork && (
            <article className="each-artwork">
                <div className="tooltip">
                    <p className="artwork-title">{eachArtwork.title}</p>
                    <p className="artwork-artist">
                        {eachArtwork.artist_title}, <span className="artwork-date">{eachArtwork.date_display}</span>
                    </p>
                </div>
                <div className="artwork-container">
                    <img
                        className="artwork-img"
                        src={`https://www.artic.edu/iiif/2/${eachArtwork.image_id}/full/843,/0/default.jpg`}
                        alt={eachArtwork.thumbnail.alt_text}
                    />
                    <button className="add-button" onClick={addToFavourites}>
                        <img src={plus} alt="Plus icon" />
                    </button>
                </div>
            </article>
        )
    )
}

export default EachArtwork
