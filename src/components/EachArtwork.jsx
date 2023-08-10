import { useState, useEffect } from "react"
import axios from "axios"
import plus from "../assets/plus.svg"
import minus from "../assets/minus.svg"
import ArtworkDetails from "./ArtworkDetails"
import { addToFavourites } from "../utils/addToFavourites"
import { deleteFromFavourites } from "../utils/deleteFromFavourites"
import Toast from "./Toast"
import API_URL from "../utils/API_URL"

function EachArtwork({ artwork }) {
    const [eachArtwork, setEachArtwork] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [showAddToast, setShowAddToast] = useState(false)
    const [showRemoveToast, setShowRemoveToast] = useState(false)
    const [favouriteArtworks, setFavouriteArtworks] = useState([])
    const [isFavourite, setIsFavourite] = useState(false)

    const tooltip = document.querySelectorAll(".tooltip")
    const allArtworks = [...document.querySelectorAll(".each-artwork")]

    useEffect(() => {
        axios
            .get(API_URL)
            .then(response => {
                setFavouriteArtworks(response.data)
                // Check if the current artwork is part of the favorites
                const isCurrentFavourite = response.data.some(
                    favourite => favourite.id === eachArtwork?.id
                )
                setIsFavourite(isCurrentFavourite)
            })
            .catch(error => console.error(error.message))
    }, [eachArtwork])

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

    const handleToggleFavourites = () => {
        if (isFavourite) {
            deleteFromFavourites(eachArtwork.id)
                .then(() => {
                    setIsFavourite(false)
                    setShowRemoveToast(true)
                    setTimeout(() => {
                        setShowRemoveToast(false)
                    }, 3000)
                })
                .catch(error => console.error(error.message))
        } else {
            addToFavourites(eachArtwork)
                .then(() => {
                    setIsFavourite(true)
                    setShowAddToast(true)
                    setTimeout(() => {
                        setShowAddToast(false)
                    }, 3000)
                })
                .catch(error => {
                    console.error(error.message)
                })
        }
    }

    const handleTooltip = e => {
        for (let i = 0; i <= tooltip.length; i++) {
            const tooltipWidth = tooltip[i].offsetWidth
            const pageWidth = window.innerWidth

            let leftPosition = e.pageX + 15
            if (leftPosition + tooltipWidth > pageWidth) {
                leftPosition = e.pageX - tooltipWidth - 100
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
                    <p className="each-artwork-artist">{eachArtwork.artist_title}</p>
                    <p className="each-artwork-title">
                        {eachArtwork.title},{" "}
                        <span className="each-artwork-date">{eachArtwork.date_display}</span>
                    </p>
                </div>
                <div className="each-artwork-container">
                    {showAddToast && <Toast message="Added to favourites" />}
                    {showRemoveToast && <Toast message="Removed from favourites" />}
                    <img
                        className="each-artwork-img"
                        src={`https://www.artic.edu/iiif/2/${eachArtwork.image_id}/full/843,/0/default.jpg`}
                        alt={eachArtwork.thumbnail.alt_text}
                        onClick={openModal}
                    />
                    <button className="add-button" onClick={handleToggleFavourites}>
                        {isFavourite ? (
                            <img src={minus} alt="Minus icon" />
                        ) : (
                            <img src={plus} alt="Plus icon" />
                        )}
                    </button>
                </div>
                {modalOpen && <ArtworkDetails artwork={eachArtwork} onClose={closeModal} />}
            </article>
        )
    )
}

export default EachArtwork
