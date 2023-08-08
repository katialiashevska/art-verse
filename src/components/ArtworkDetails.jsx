import React from "react"

function ArtworkDetails({ artwork, onClose }) {
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
                    <span className="close-button" onClick={onClose}>
                        &times;
                    </span>
                    <div className="modal-navigation">
                        <button>Add to favourites</button>
                    </div>
                    <div className="modal-card">
                        <p className="modal-artist">{artwork.artist_title}</p>
                        <p className="modal-title">
                            {artwork.title},
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
