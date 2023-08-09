import exit from "../assets/exit.svg"
import { addToFavourites } from "./addToFavourites"
import whiteArrow from "../assets/white-arrow.svg"

function ArtworkDetails({ artwork, allArtworks, onClose }) {
    const handleFavourites = () => {
        addToFavourites(artwork)
            .then(message => alert(message))
            .catch(error => alert(error.message))
    }

    const currentIndex = allArtworks.findIndex(art => art.id === artwork.id)

    const goToPreviousArtwork = () => {
        const previousIndex = (currentIndex - 1 + allArtworks.length) % allArtworks.length
        // Navigate to previous artwork using allArtworks[previousIndex]
    }

    const goToNextArtwork = () => {
        const nextIndex = (currentIndex + 1) % allArtworks.length
        // Navigate to next artwork using allArtworks[nextIndex]
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-img-container">
                    <img
                        src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                        alt={artwork.thumbnail.alt_text}
                        className="modal-img"
                    />
                </div>
                <div className="modal-info-container">
                    <img
                        className="modal-exit-button"
                        src={exit}
                        alt="Exit icon"
                        onClick={onClose}
                    />
                    <div className="modal-navigation">
                        <button className="modal-previous-button" onClick={goToPreviousArtwork}>
                            <img src={whiteArrow} alt="Arrow icon" />
                        </button>
                        <button className="modal-add-button" onClick={handleFavourites}>
                            Add to favourites
                        </button>
                        <button className="modal-next-button" onClick={goToNextArtwork}>
                            <img src={whiteArrow} alt="Arrow icon" />
                        </button>
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
