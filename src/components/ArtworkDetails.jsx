import { useState, useEffect } from "react"
import axios from "axios"
import exit from "../assets/exit.svg"
import { addToFavourites } from "../utils/addToFavourites"
import { deleteFromFavourites } from "../utils/deleteFromFavourites"
import whiteArrow from "../assets/white-arrow.svg"
import API_URL from "../utils/API_URL"
import Toast from "./Toast"

function ArtworkDetails({ artwork, onClose }) {
    const [isFavourite, setIsFavourite] = useState(false)
    const [showAddToast, setShowAddToast] = useState(false)
    const [showRemoveToast, setShowRemoveToast] = useState(false)

    useEffect(() => {
        axios
            .get(API_URL)
            .then(response => {
                const isArtworkInFavorites = response.data.some(
                    favorite => favorite.id === artwork.id
                )
                setIsFavourite(isArtworkInFavorites)
            })
            .catch(error => console.error(error.message))
    }, [artwork])

    const handleToggleFavourites = () => {
        if (isFavourite) {
            deleteFromFavourites(artwork.id)
                .then(() => {
                    setIsFavourite(false)
                    setShowRemoveToast(true)
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
                {showAddToast && <Toast message="Artwork added" />}
                {showRemoveToast && <Toast message="Artwork removed" />}

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
                    <div className="modal-navigation">
                        {/* <button className="modal-previous-button round-button">
                            <img src={whiteArrow} alt="Arrow icon" />
                        </button> */}
                        <button className="modal-add-button" onClick={handleToggleFavourites}>
                            {isFavourite ? "Remove from favourites" : "Add to favourites"}
                        </button>
                        {/* <button className="modal-next-button round-button">
                            <img src={whiteArrow} alt="Arrow icon" />
                        </button> */}
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
