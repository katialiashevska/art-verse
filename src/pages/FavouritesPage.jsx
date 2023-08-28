import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { deleteFromFavourites } from "../utils/deleteFromFavourites"
import API_URL from "../utils/API_URL"
import Toast from "../components/Toast"
import FavouriteDetails from "../components/FavouriteDetails"
import { AuthContext } from "../context/auth.context"
import "../styles/favourites.css"
import "../styles/toast.css"
import logo from "../assets/logo.svg"
import blackArrow from "../assets/black-arrow.svg"

function FavouritesPage() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

    const [favouriteArtworks, setFavouriteArtworks] = useState([])
    // State to manage the display of "Removed from favourites" toast
    const [showRemoveToast, setShowRemoveToast] = useState(false)
    // State to manage selected artwork for modal
    const [selectedArtwork, setSelectedArtwork] = useState(null)

    useEffect(() => {
        const authToken = localStorage.getItem("authToken")

        axios
            .get(API_URL, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then(response => setFavouriteArtworks(response.data))
            .catch(error => console.error(error.message))
    }, [])

    const deleteArtwork = artworkId => {
        deleteFromFavourites(artworkId, setFavouriteArtworks)
            .then(() => {
                setShowRemoveToast(true)
                setTimeout(() => {
                    setShowRemoveToast(false)
                }, 3000)
            })
            .catch(error => console.error(error.message))
    }

    // Function to update state after a deletion of an artwork
    const handleDeleteArtwork = () => {
        setFavouriteArtworks(prevArtworks =>
            prevArtworks.filter(artwork => artwork._id !== selectedArtwork._id)
        )
        setShowRemoveToast(true)
        setTimeout(() => {
            setShowRemoveToast(false)
        }, 3000)
    }

    // Functions to open/close the modal for artwork details
    const openModal = artwork => {
        setSelectedArtwork(artwork)
    }
    const closeModal = () => {
        setSelectedArtwork(null)
    }

    return (
        favouriteArtworks && (
            <div id="favourites">
                <Link className="back-button" to="/">
                    <img id="black-arrow" src={blackArrow} alt="Arrow icon" />
                    Back
                </Link>
                <Link className="navbar-bg" to="/">
                    <img id="logo" src={logo} alt="ArtVerse logo" />
                </Link>
                <div id="favourites-header">
                    <button id="logout-button" onClick={logOutUser}>
                        Log out
                    </button>
                    <h1>{user.name}’s favourites</h1>
                </div>
                {showRemoveToast && <Toast message="Removed from favourites" />}
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
                        <article key={artwork._id} className="favourites-artwork-container">
                            <div className="favourites-flex">
                                <div className="favourites-img-container">
                                    <img
                                        className="favourites-img"
                                        src={artwork.image}
                                        alt={artwork.altText}
                                        onClick={() => openModal(artwork)}
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
                                onClick={() => deleteArtwork(artwork._id)}>
                                Remove
                            </button>
                        </article>
                    ))}
                {selectedArtwork && (
                    <FavouriteDetails
                        artwork={selectedArtwork}
                        onClose={closeModal}
                        onDelete={handleDeleteArtwork}
                    />
                )}
            </div>
        )
    )
}

export default FavouritesPage
