import { useState, useEffect } from "react"
import axios from "axios"
import plus from "../assets/plus.svg"
import ArtworkDetails from "./ArtworkDetails"

function EachArtwork({ artwork }) {
    const [eachArtwork, setEachArtwork] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const tooltip = document.querySelectorAll(".tooltip")
    const allArtworks = document.querySelectorAll(".each-artwork")

    useEffect(() => {
        axios
            .get(artwork.api_link)
            .then(response => setEachArtwork(response.data.data))
            .catch(error => console.error(error.message))
    }, [artwork.api_link])

    const openModal = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const addToFavourites = () => {
        const newArtwork = {
            id: eachArtwork.id,
            title: eachArtwork.title,
            artist: eachArtwork.artist_display,
            date: eachArtwork.date_display,
            medium: eachArtwork.medium_display,
            dimensions: eachArtwork.dimensions,
            alt_text: eachArtwork.thumbnail.alt_text,
            img: `https://www.artic.edu/iiif/2/${eachArtwork.image_id}/full/843,/0/default.jpg`,
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

    const handleTooltip = e => {
        for (let i = 0; i <= tooltip.length; i++) {
            const tooltipWidth = tooltip[i].offsetWidth
            const pageWidth = window.innerWidth

            let leftPosition = e.pageX + 15
            if (leftPosition + tooltipWidth > pageWidth) {
                leftPosition = e.pageX - tooltipWidth - 30
            }

            tooltip[i].style.left = leftPosition + "px"
            tooltip[i].style.top = e.pageY + "px"
        }
    }

    document.addEventListener("mousemove", handleTooltip, false)

    // Handling the fact that the cursor need to point each artwork on homepage
    // but also stop pointing when the details component is open
    useEffect(() => {
        if (modalOpen) {
            allArtworks.forEach(artwork => artwork.classList.add("pointer-inactive"))
        } else {
            allArtworks.forEach(artwork => artwork.classList.remove("pointer-inactive"))
        }
    }, [modalOpen, allArtworks])

    return (
        eachArtwork && (
            <article className={`each-artwork ${modalOpen ? "pointer-inactive" : ""}`}>
                <div className="tooltip">
                    <p className="each-artwork-title">{eachArtwork.title}</p>
                    <p className="each-artwork-artist">
                        {eachArtwork.artist_title},{" "}
                        <span className="each-artwork-date">{eachArtwork.date_display}</span>
                    </p>
                </div>
                <div className="each-artwork-container">
                    <img
                        className="each-artwork-img"
                        src={`https://www.artic.edu/iiif/2/${eachArtwork.image_id}/full/843,/0/default.jpg`}
                        alt={eachArtwork.thumbnail.alt_text}
                        onClick={openModal}
                    />
                    <button className="add-button" onClick={addToFavourites}>
                        <img src={plus} alt="Plus icon" />
                    </button>
                </div>
                {modalOpen && <ArtworkDetails artwork={eachArtwork} onClose={closeModal} />}
            </article>
        )
    )
}

export default EachArtwork
