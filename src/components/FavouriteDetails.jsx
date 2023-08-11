import { useState, useEffect } from "react"
import exit from "../assets/exit.svg"
import { deleteFromFavourites } from "../utils/deleteFromFavourites"
import Toast from "./Toast"
import "../styles/modal.css"
import { PressEscape } from "./PressEscape"

// Props:
// - artwork: the favourite artwork object to display
// - onClose: function to close the modal
// - onDelete: function to handle deletion from favourites
function FavouriteDetails({ artwork, onClose, onDelete }) {
    // State to track if the artwork is a favourite
    const [isFavourite, setIsFavourite] = useState(false)
    // State to manage "Removed from favourites" toast
    const [showRemoveToast, setShowRemoveToast] = useState(false)

    PressEscape(onClose)

    const deleteFavourites = () => {
        deleteFromFavourites(artwork.id)
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
                    <img src={artwork.img} alt={artwork.altText} className="modal-img" />
                </div>
                <div className="modal-info-container">
                    <img
                        className="modal-exit-button round-button"
                        src={exit}
                        alt="Exit icon"
                        onClick={onClose}
                    />
                    <div className="modal-buttons">
                        <button className="modal-add-remove-button" onClick={deleteFavourites}>
                            Remove from favourites
                        </button>
                    </div>
                    <div className="modal-card">
                        <p className="modal-artist">{artwork.artist}</p>
                        <p className="modal-title">
                            {artwork.title}, <span className="modal-date">{artwork.date}</span>
                        </p>
                        <p className="modal-medium">{artwork.medium}</p>
                        <p className="modal-dimensions">{artwork.dimensions}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavouriteDetails
