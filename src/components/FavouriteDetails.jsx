import { useState, useEffect } from "react"
import { deleteFromFavourites } from "../utils/deleteFromFavourites"
import axios from "axios"
import Toast from "./Toast"
import { PressEscape } from "./PressEscape"
import API_URL from "../utils/API_URL"
import "../styles/modal.css"
import "../styles/toast.css"
import exit from "../assets/exit.svg"
import arrowPrevious from "../assets/arrow-previous.svg"
import arrowNext from "../assets/arrow-next.svg"

// Props:
// - artwork: the favourite artwork object to display
// - onClose: function to close the modal
// - onDelete: function to handle deletion from favourites
function FavouriteDetails({ artwork, onClose, onDelete, favouriteArtworks, index }) {
    // State to track if the artwork is a favourite
    const [isFavourite, setIsFavourite] = useState(false)
    // State to manage "Removed from favourites" toast
    const [showRemoveToast, setShowRemoveToast] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(index)
    const [currentArtwork, setCurrentArtwork] = useState(favouriteArtworks[index])

    const authToken = localStorage.getItem("authToken")

    PressEscape(onClose)

    // Inside FavouriteDetails component
    useEffect(() => {
        // Fetch artwork details for the currently displayed artwork
        axios
            .get(`${API_URL}/${currentArtwork.id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then(response => {
                // Update currentArtwork state with the fetched data
                setCurrentArtwork(response.data)
            })
            .catch(error => console.error(error.message))
    }, [favouriteArtworks])

    const handleNextClick = () => {
        const nextIndex = (currentIndex + 1) % favouriteArtworks.length
        setCurrentIndex(nextIndex)
        axios
            .get(`${API_URL}/${favouriteArtworks[nextIndex].id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then(response => {
                // Update currentArtwork state with the fetched data
                setCurrentArtwork(response.data)
            })
            .catch(error => console.error(error.message))
    }

    const handlePreviousClick = () => {
        const prevIndex = (currentIndex - 1 + favouriteArtworks.length) % favouriteArtworks.length
        setCurrentIndex(prevIndex)
        axios
            .get(`${API_URL}/${favouriteArtworks[prevIndex].id}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then(response => {
                // Update currentArtwork state with the fetched data
                setCurrentArtwork(response.data)
            })
            .catch(error => console.error(error.message))
    }

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === "ArrowLeft") {
                // Handle "Previous" action
                handlePreviousClick()
            } else if (event.key === "ArrowRight") {
                // Handle "Next" action
                handleNextClick()
            }
        }

        // Attach the event listener
        window.addEventListener("keydown", handleKeyDown)

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [currentIndex])

    const deleteFavourites = () => {
        deleteFromFavourites(currentArtwork.id)
            .then(() => {
                setIsFavourite(false)
                setShowRemoveToast(true)
                // Hide the toast after 3 seconds
                setTimeout(() => {
                    setShowRemoveToast(false)
                }, 3000)
                onDelete()
                onClose()
            })
            .catch(error => console.error(error.message))
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {showRemoveToast && <Toast message="Removed from favourites" />}
                <div className="modal-img-container">
                    <img
                        src={currentArtwork.image}
                        alt={currentArtwork.altText}
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
                        <img
                            className="round-button"
                            src={arrowPrevious}
                            alt="Previous icon"
                            onClick={handlePreviousClick}
                        />
                        <button className="modal-add-remove-button" onClick={deleteFavourites}>
                            Remove from favourites
                        </button>
                        <img
                            className="round-button"
                            src={arrowNext}
                            alt="Next icon"
                            onClick={handleNextClick}
                        />
                    </div>
                    <div className="modal-card">
                        <p className="modal-artist">{currentArtwork.artist}</p>
                        <p className="modal-title">
                            {currentArtwork.title}
                            <span className="modal-date">, {currentArtwork.date}</span>
                        </p>
                        <p className="modal-medium">{currentArtwork.medium}</p>
                        <p className="modal-dimensions">{currentArtwork.dimensions}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavouriteDetails
