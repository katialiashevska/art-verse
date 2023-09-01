import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { addToFavourites } from "../utils/addToFavourites"
import { deleteFromFavourites } from "../utils/deleteFromFavourites"
import API_URL from "../utils/API_URL"
import Toast from "./Toast"
import { PressEscape } from "./PressEscape"
import { AuthContext } from "../context/auth.context"
import "../styles/modal.css"
import "../styles/toast.css"
import exit from "../assets/exit.svg"
import arrowPrevious from "../assets/arrow-previous.svg"
import arrowNext from "../assets/arrow-next.svg"

// Props:
// - artworks: the list of all artworks
// - artwork: the current artwork to display
// - index: the index of artwork
// - onClose: function to close the modal
function ArtworkDetails({ artworks, artwork, index, onClose }) {
    // State to track whether the artwork is a favourite
    const [isFavourite, setIsFavourite] = useState(false)
    // State to manage the display of "Added to favourites" toast
    const [showAddToast, setShowAddToast] = useState(false)
    // State to manage the display of "Removed from favourites" toast
    const [showRemoveToast, setShowRemoveToast] = useState(false)
    // States to manage arrow navigation display
    const [currentIndex, setCurrentIndex] = useState(index)
    const [currentArtwork, setCurrentArtwork] = useState(artworks[index])

    const { isLoggedIn } = useContext(AuthContext)

    PressEscape(onClose)

    // Fetch data from API to determine if the artwork is in favourites
    useEffect(() => {
        const authToken = localStorage.getItem("authToken")

        axios
            .get(API_URL, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then(response => {
                const favouriteIds = response.data.map(artwork => artwork.id)
                if (favouriteIds.includes(currentArtwork.id)) {
                    setIsFavourite(true)
                } else {
                    setIsFavourite(false)
                }
            })
            .catch(error => console.error(error.message))
    }, [currentArtwork])

    // Fetch artwork details for the currently displayed artwork
    useEffect(() => {
        axios
            .get(artworks[currentIndex].api_link)
            .then(response => {
                setCurrentArtwork(response.data.data)
            })
            .catch(error => console.error(error.message))
    }, [artworks, currentIndex])

    const handleNextClick = () => {
        const nextIndex = (currentIndex + 1) % artworks.length
        setCurrentIndex(nextIndex)
        axios
            .get(artworks[nextIndex].api_link)
            .then(response => {
                setCurrentArtwork(response.data.data)
            })
            .catch(error => console.error(error.message))
    }

    const handlePreviousClick = () => {
        const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length
        setCurrentIndex(prevIndex)
        axios
            .get(artworks[prevIndex].api_link)
            .then(response => {
                setCurrentArtwork(response.data.data)
            })
            .catch(error => console.error(error.message))
    }

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === "ArrowLeft") {
                handlePreviousClick()
            } else if (event.key === "ArrowRight") {
                handleNextClick()
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [currentIndex])

    // Function to handle toggling artwork's favourite status
    // to display all the info accordingly
    const handleToggleFavourites = () => {
        if (isFavourite) {
            deleteFromFavourites(currentArtwork.id)
                .then(() => {
                    setIsFavourite(false)
                    setShowRemoveToast(true)
                    setTimeout(() => {
                        setShowRemoveToast(false)
                    }, 3000)
                })
                .catch(error => console.error(error.message))
        } else {
            addToFavourites(currentArtwork)
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

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {showAddToast && <Toast message="Added to favourites" />}
                {showRemoveToast && <Toast message="Removed from favourites" />}
                <div className="modal-img-container">
                    <img
                        src={`https://www.artic.edu/iiif/2/${currentArtwork.image_id}/full/843,/0/default.jpg`}
                        alt={currentArtwork.thumbnail.alt_text}
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
                        {isLoggedIn && (
                            <button
                                className="modal-add-remove-button"
                                onClick={handleToggleFavourites}>
                                {isFavourite ? "Remove from favourites" : "Add to favourites"}
                            </button>
                        )}
                        {!isLoggedIn && (
                            <button className="modal-add-remove-button">
                                <Link className="login-redirect" to="/login">
                                    Add to favourites
                                </Link>
                            </button>
                        )}
                        <img
                            className="round-button"
                            src={arrowNext}
                            alt="Next icon"
                            onClick={handleNextClick}
                        />
                    </div>
                    <div className="modal-card">
                        <p className="modal-artist">{currentArtwork.artist_display}</p>
                        <p className="modal-title">
                            {currentArtwork.title}
                            <span className="modal-date">, {currentArtwork.date_display}</span>
                        </p>
                        <p className="modal-medium">{currentArtwork.medium_display}</p>
                        <p className="modal-dimensions">{currentArtwork.dimensions}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtworkDetails
