import { useState, useEffect } from "react"
import axios from "axios"
import { addToFavourites } from "../utils/addToFavourites"
import { deleteFromFavourites } from "../utils/deleteFromFavourites"
import API_URL from "../utils/API_URL"
import Toast from "./Toast"
import { PressEscape } from "./PressEscape"
import "../styles/modal.css"
import "../styles/toast.css"
import exit from "../assets/exit.svg"
import arrowPrevious from "../assets/arrow-previous.svg"
import arrowNext from "../assets/arrow-next.svg"

function ArtworkDetails({ artwork, onClose }) {
    // State to track whether the artwork is in favourites or not
    const [isFavourite, setIsFavourite] = useState(false)
    // State to manage the display of "Added to favourites" toast
    const [showAddToast, setShowAddToast] = useState(false)
    // State to manage the display of "Removed from favourites" toast
    const [showRemoveToast, setShowRemoveToast] = useState(false)

    PressEscape(onClose)

    // Fetch data from API to determine if the artwork is in favourites
    // when the artwork prop changes
    useEffect(() => {
        const authToken = localStorage.getItem("authToken")

        axios
            .get(API_URL, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then(response => {
                const isArtworkInFavourites = response.data.some(
                    favourite => favourite.id === artwork.id
                )
                setIsFavourite(isArtworkInFavourites)
            })
            .catch(error => console.error(error.message))
    }, [artwork])

    // Function to handle toggling artwork's favourite status
    // to display all the info accordingly
    const handleToggleFavourites = () => {
        if (isFavourite) {
            deleteFromFavourites(artwork.id)
                .then(() => {
                    setIsFavourite(false)
                    setShowRemoveToast(true)
                    // Hide the toast after 3 seconds
                    setTimeout(() => {
                        setShowRemoveToast(false)
                    }, 3000)
                })
                .catch(error => console.error(error.message))
        } else {
            addToFavourites(artwork)
                .then(() => {
                    setIsFavourite(true)
                    setShowAddToast(true)
                    // Hide the toast after 3 seconds
                    setTimeout(() => {
                        setShowAddToast(false)
                    }, 3000)
                })
                .catch(error => {
                    console.error(error.message)
                })
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {showAddToast && <Toast message="Added to favourites" />}
                {showRemoveToast && <Toast message="Removed from favourites" />}
                <div className="modal-img-container">
                    <img
                        src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                        alt={artwork.thumbnail.alt_text}
                        className="modal-img"
                    />
                </div>
                <div className="modal-info-container">
                    <img
                        className="modal-exit-button round-button"
                        src={exit}
                        alt="Exit icon"
                        onClick={onClose}
                    />
                    <div className="modal-buttons">
                        <img className="round-button" src={arrowPrevious} alt="Previous icon" />
                        <button
                            className="modal-add-remove-button"
                            onClick={handleToggleFavourites}>
                            {isFavourite ? "Remove from favourites" : "Add to favourites"}
                        </button>
                        <img className="round-button" src={arrowNext} alt="Next icon" />
                    </div>
                    <div className="modal-card">
                        <p className="modal-artist">{artwork.artist_display}</p>
                        <p className="modal-title">
                            {artwork.title},{" "}
                            <span className="modal-date">{artwork.date_display}</span>
                        </p>
                        <p className="modal-medium">{artwork.medium_display}</p>
                        <p className="modal-dimensions">{artwork.dimensions}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtworkDetails
