import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import exit from "../assets/exit.svg"
import { addToFavourites } from "../utils/addToFavourites"
import { deleteFromFavourites } from "../utils/deleteFromFavourites"
import whiteArrow from "../assets/white-arrow.svg"
import API_URL from "../utils/API_URL"
import Toast from "./Toast"

function FavouriteDetails({ artwork, onClose, onDelete }) {
    const [isFavourite, setIsFavourite] = useState(false)
    const [showRemoveToast, setShowRemoveToast] = useState(false)

    const handleToggleFavourites = () => {
        deleteFromFavourites(artwork.id)
            .then(() => {
                setIsFavourite(false)
                setShowRemoveToast(true)
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
                    <div className="modal-navigation">
                        {/* <button className="modal-previous-button round-button">
                            <img src={whiteArrow} alt="Arrow icon" />
                        </button> */}
                        <button className="modal-add-button" onClick={handleToggleFavourites}>
                            Remove from favourites
                        </button>
                        {/* <button className="modal-next-button round-button">
                            <img src={whiteArrow} alt="Arrow icon" />
                        </button> */}
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
