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
    const { user, logOutUser } = useContext(AuthContext)

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
            prevArtworks.filter(artwork => artwork.id !== selectedArtwork.id)
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

    const startEditing = artwork => {
        const updatedArtworks = favouriteArtworks.map(item => {
            if (item.id === artwork.id) {
                return { ...item, editing: true }
            }
            return item
        })
        setFavouriteArtworks(updatedArtworks)
    }

    const deleteComment = artwork => {
        const updatedArtworks = favouriteArtworks.map(item => {
            if (item.id === artwork.id) {
                return { ...item, comment: "", editing: false }
            }
            return item
        })
        setFavouriteArtworks(updatedArtworks)
    }

    const saveComment = artwork => {
        const authToken = localStorage.getItem("authToken")

        axios
            .put(
                `${API_URL}/${artwork.id}`,
                { comment: artwork.comment },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            )
            .then(response => {
                const updatedArtworks = favouriteArtworks.map(item => {
                    if (item.id === artwork.id) {
                        return { ...item, editing: false }
                    }
                    return item
                })
                setFavouriteArtworks(updatedArtworks)
                console.log("Comment saved successfully:", response.data)
            })
            .catch(error => {
                console.error("Error saving comment:", error.message)
            })
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
                        <article key={artwork.id} className="favourites-artwork-container">
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
                                onClick={() => deleteArtwork(artwork.id)}>
                                Remove
                            </button>

                            <div className="favourites-comment-container">
                                {artwork.comment && (
                                    <>
                                        {artwork.editing ? (
                                            <>
                                                <textarea
                                                    className="favourites-comment"
                                                    name="comment"
                                                    rows="6"
                                                    cols="15"
                                                    value={artwork.comment}
                                                    onChange={event => {
                                                        const updatedArtworks =
                                                            favouriteArtworks.map(item => {
                                                                if (item.id === artwork.id) {
                                                                    return {
                                                                        ...item,
                                                                        comment: event.target.value,
                                                                    }
                                                                }
                                                                return item
                                                            })
                                                        setFavouriteArtworks(updatedArtworks)
                                                    }}
                                                />
                                                <div className="comment-buttons">
                                                    <button
                                                        className="favourites-button delete-comment"
                                                        onClick={() => deleteComment(artwork)}>
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="favourites-button save-comment"
                                                        onClick={() => saveComment(artwork)}>
                                                        Save
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <p className="favourites-comment">
                                                    {artwork.comment}
                                                </p>
                                                <button
                                                    className="favourites-button edit-comment"
                                                    onClick={() => startEditing(artwork)}>
                                                    Edit
                                                </button>
                                            </>
                                        )}
                                    </>
                                )}
                                {!artwork.comment && (
                                    <>
                                        {artwork.editing ? (
                                            <>
                                                <textarea
                                                    className="favourites-comment"
                                                    name="comment"
                                                    rows="6"
                                                    cols="15"
                                                    value={artwork.comment}
                                                    onChange={event => {
                                                        const updatedArtworks =
                                                            favouriteArtworks.map(item => {
                                                                if (item.id === artwork.id) {
                                                                    return {
                                                                        ...item,
                                                                        comment: event.target.value,
                                                                    }
                                                                }
                                                                return item
                                                            })
                                                        setFavouriteArtworks(updatedArtworks)
                                                    }}
                                                />
                                                <div className="comment-buttons">
                                                    <button
                                                        className="favourites-button delete-comment"
                                                        onClick={() => deleteComment(artwork)}>
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="favourites-button save-comment"
                                                        onClick={() => saveComment(artwork)}>
                                                        Save
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <button
                                                className="favourites-button add-comment"
                                                onClick={() => startEditing(artwork)}>
                                                Add a comment
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
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
