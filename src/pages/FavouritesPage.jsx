import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import logo from "../assets/logo.svg"
import blackArrow from "../assets/black-arrow.svg"

const API_URL = "https://art-verse-backend.adaptable.app/favouriteArtworks"

function FavouritesPage() {
    const [favouriteArtworks, setFavouriteArtworks] = useState(null)

    useEffect(() => {
        axios
            .get(API_URL)
            .then(response => setFavouriteArtworks(response.data))
            .catch(error => console.error(error.message))
    }, [])

    const deleteArtwork = artworkId => {
        axios
            .delete(`${API_URL}/${artworkId}`)
            .then(() => {
                setFavouriteArtworks(artworks =>
                    artworks.filter(artwork => artwork.id !== artworkId)
                )
            })
            .catch(error => console.error(error.message))
    }

    if (!favouriteArtworks) {
        return <p>Loading favourite artworks...</p>
    }

    return (
        <div id="favourites">
            <Link className="navbar-bg" to="/">
                <img id="logo" src={logo} alt="ArtVerse logo" />
            </Link>
            <div id="favourites-header">
                <Link className="back-button" to="/">
                    <img id="black-arrow" src={blackArrow} alt="Arrow icon" />
                    Back
                </Link>
                <h1>My favourites</h1>
            </div>
            {favouriteArtworks.map(artwork => (
                <article key={artwork.id} className="favourites-artwork-container">
                    <div className="favourites-flex">
                        <div className="favourites-img-container">
                            <img
                                className="favourites-img"
                                src={artwork.img}
                                alt={artwork.alt_text}
                            />
                        </div>
                        <div className="favourites-text-container">
                            <div className="favourites-upper-text">
                                <p className="favourites-artist">{artwork.artist}</p>
                                <p className="favourites-title">
                                    {artwork.title},{" "}
                                    <span className="favourites-date">{artwork.date}</span>
                                </p>
                            </div>
                            <div className="favourites-lower-text">
                                <p className="favourites-medium">{artwork.medium}</p>
                                <p className="favourites-dimensions">{artwork.dimensions}</p>
                            </div>
                        </div>
                    </div>
                    <button className="remove-button" onClick={() => deleteArtwork(artwork.id)}>
                        Remove
                    </button>
                </article>
            ))}
        </div>
    )
}

export default FavouritesPage
