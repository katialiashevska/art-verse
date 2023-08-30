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
    const [favouriteArtworks, setFavouriteArtworks] = useState([])
    // State to manage the display of "Removed from favourites" toast
    const [showRemoveToast, setShowRemoveToast] = useState(false)
    // State to manage selected artwork for modal
    const [selectedArtwork, setSelectedArtwork] = useState(null)
    const [comment, setComment] = useState("")

    const { user, logOutUser } = useContext(AuthContext)
    const authToken = localStorage.getItem("authToken")

    const handleComment = e => setComment(e.target.value)

    useEffect(() => {
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

    const saveComment = artwork => {
        axios
            .put(
                `${API_URL}/${artwork.id}`,
                { comment: comment },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            )
            .then(() => {
                const updatedArtworks = favouriteArtworks.map(favouriteArtwork => {
                    if (favouriteArtwork.id === artwork.id) {
                        return { ...favouriteArtwork, comment: comment, editing: false }
                    }
                    return favouriteArtwork
                })
                setFavouriteArtworks(updatedArtworks)
            })
            .catch(error => {
                console.error("Error editing a comment:", error.message)
            })
    }

    const editComment = artwork => {
        setComment(artwork.comment)
        const updatedArtworks = favouriteArtworks.map(favouriteArtwork => {
            if (favouriteArtwork.id === artwork.id) {
                return { ...favouriteArtwork, editing: true }
            }
            return favouriteArtwork
        })
        setFavouriteArtworks(updatedArtworks)
    }

    const deleteComment = artwork => {
        axios
            .put(
                `${API_URL}/${artwork.id}`,
                { comment: "" },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            )
            .then(() => {
                const updatedArtworks = favouriteArtworks.map(favouriteArtwork => {
                    if (favouriteArtwork.id === artwork.id) {
                        return { ...favouriteArtwork, comment: "", editing: false }
                    }
                    return favouriteArtwork
                })
                setFavouriteArtworks(updatedArtworks)
            })
            .catch(error => {
                console.error("Error deleting a comment:", error.message)
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
                                            <textarea
                                                rows="4"
                                                cols="16"
                                                className="favourites-comment"
                                                type="text"
                                                name="comment"
                                                value={comment}
                                                onChange={handleComment}
                                                onKeyDown={e => {
                                                    if (e.key === "Enter" && !e.shiftKey) {
                                                        // Prevent a new line from being entered
                                                        e.preventDefault()
                                                        saveComment(artwork)
                                                    }
                                                }}
                                                ref={textareaRef => {
                                                    if (artwork.editing && textareaRef) {
                                                        // Focus the textarea if it's in editing mode
                                                        if (!textareaRef.hasFocus) {
                                                            textareaRef.focus()
                                                            textareaRef.setSelectionRange(
                                                                textareaRef.value.length,
                                                                textareaRef.value.length
                                                            )
                                                            textareaRef.hasFocus = true
                                                        }
                                                    }
                                                }}
                                                onBlur={e => {
                                                    // Reset the hasFocus flag when textarea loses focus
                                                    e.target.hasFocus = false
                                                }}
                                                autoFocus
                                            />
                                        ) : (
                                            <textarea
                                                rows="4"
                                                cols="16"
                                                className="favourites-comment"
                                                type="text"
                                                name="comment"
                                                value={artwork.comment}
                                                onChange={handleComment}
                                            />
                                        )}
                                        <div className="comment-buttons">
                                            <button
                                                className="delete-comment-button"
                                                onClick={() => deleteComment(artwork)}
                                                type="button">
                                                Delete
                                            </button>
                                            {artwork.editing ? (
                                                <button
                                                    className="save-edit-comment-button"
                                                    onClick={() => saveComment(artwork)}
                                                    type="button">
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    className="save-edit-comment-button"
                                                    onClick={() => editComment(artwork)}
                                                    type="button">
                                                    Edit
                                                </button>
                                            )}
                                        </div>
                                    </>
                                )}
                                {!artwork.comment && (
                                    <>
                                        {artwork.editing ? (
                                            <>
                                                <textarea
                                                    rows="4"
                                                    cols="16"
                                                    className="favourites-comment"
                                                    type="text"
                                                    name="comment"
                                                    value={comment}
                                                    onChange={handleComment}
                                                    onKeyDown={e => {
                                                        if (e.key === "Enter" && !e.shiftKey) {
                                                            // Prevent a new line from being entered
                                                            e.preventDefault()
                                                            saveComment(artwork)
                                                        }
                                                    }}
                                                    ref={textareaRef => {
                                                        if (artwork.editing && textareaRef) {
                                                            // Focus the textarea if it's in editing mode
                                                            if (!textareaRef.hasFocus) {
                                                                textareaRef.focus()
                                                                textareaRef.setSelectionRange(
                                                                    textareaRef.value.length,
                                                                    textareaRef.value.length
                                                                )
                                                                textareaRef.hasFocus = true
                                                            }
                                                        }
                                                    }}
                                                    onBlur={e => {
                                                        // Reset the hasFocus flag when textarea loses focus
                                                        e.target.hasFocus = false
                                                    }}
                                                    autoFocus
                                                />
                                                <div className="comment-buttons">
                                                    <button
                                                        className="delete-comment-button"
                                                        onClick={() => deleteComment(artwork)}
                                                        type="button">
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="save-edit-comment-button"
                                                        onClick={() => saveComment(artwork)}
                                                        type="button">
                                                        Save
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <button
                                                className="add-comment-button"
                                                onClick={() => editComment(artwork)}
                                                type="button">
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
