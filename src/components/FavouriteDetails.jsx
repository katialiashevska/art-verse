import { useState } from "react"
import { deleteFromFavourites } from "../utils/deleteFromFavourites"
import Toast from "./Toast"
import { PressEscape } from "./PressEscape"
import "../styles/modal.css"
import "../styles/toast.css"
import exit from "../assets/exit.svg"
import arrowPrevious from "../assets/arrow-previous.svg"
import arrowNext from "../assets/arrow-next.svg"

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
                    <img src={artwork.image} alt={artwork.altText} className="modal-img" />
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
                        <button className="modal-add-remove-button" onClick={deleteFavourites}>
                            Remove from favourites
                        </button>
                        <img className="round-button" src={arrowNext} alt="Next icon" />
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
