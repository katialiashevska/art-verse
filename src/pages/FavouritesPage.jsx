import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import logo from "../assets/logo.svg"
import blackArrow from "../assets/black-arrow.svg"
import { deleteFromFavourites } from "../components/deleteFromFavourites"
import API_URL from "../API_URL"

function FavouritesPage() {
    const [favouriteArtworks, setFavouriteArtworks] = useState(null)

    useEffect(() => {
        axios
            .get(API_URL)
            .then(response => setFavouriteArtworks(response.data))
            .catch(error => console.error(error.message))
    }, [])

    const deleteArtwork = artworkId => {
        deleteFromFavourites(artworkId, setFavouriteArtworks).catch(error =>
            console.error(error.message)
        )
    }

    return (
        favouriteArtworks && (
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
                {favouriteArtworks.length === 0 && (
                    <div id="no-favourites-container">
                        <p id="no-favourites-text">No artworks selected yet?</p>
                        <Link className="favourites-button add" to="/">
                            Add artworks
                        </Link>
                    </div>
                )}
                {favouriteArtworks.length > 0 &&
                    favouriteArtworks.map(artwork => (
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
                                        <p className="favourites-dimensions">
                                            {artwork.dimensions}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="favourites-button remove"
                                onClick={() => deleteArtwork(artwork.id)}>
                                Remove
                            </button>
                        </article>
                    ))}
            </div>
        )
    )
}

export default FavouritesPage
