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
    // State to manage adding and updating notes on artworks
    const [note, setNote] = useState("")

    const handleNote = e => setNote(e.target.value)

    // Access user authentication state and token from context to access the database
    const { user, logOutUser } = useContext(AuthContext)
    const authToken = localStorage.getItem("authToken")

    // Fetch favourite artworks when the component mounts
    useEffect(() => {
        axios
            .get(API_URL, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then(response => {
                // Add an index to each artwork for arrow navigation in modal
                const artworksWithIndex = response.data.map((artwork, index) => ({
                    ...artwork,
                    index: index,
                }))
                setFavouriteArtworks(artworksWithIndex)
            })
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

    // Function to update state after deleting an artwork
    const handleDeleteArtwork = artworkId => {
        setFavouriteArtworks(prevArtworks =>
            prevArtworks.filter(artwork => artwork.id !== artworkId)
        )
        setShowRemoveToast(true)
        setTimeout(() => {
            setShowRemoveToast(false)
        }, 3000)
    }

    const openModal = artwork => {
        setSelectedArtwork(artwork)
    }
    const closeModal = () => {
        setSelectedArtwork(null)
    }

    const saveNote = artwork => {
        axios
            .put(
                `${API_URL}/${artwork.id}`,
                { note: note },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            )
            .then(() => {
                const updatedArtworks = favouriteArtworks.map(favouriteArtwork => {
                    if (favouriteArtwork.id === artwork.id) {
                        return { ...favouriteArtwork, note: note, editing: false }
                    }
                    return favouriteArtwork
                })
                setFavouriteArtworks(updatedArtworks)
            })
            .catch(error => {
                console.error("Error saving a note:", error.message)
            })
    }

    const editNote = artwork => {
        setNote(artwork.note)
        const updatedArtworks = favouriteArtworks.map(favouriteArtwork => {
            if (favouriteArtwork.id === artwork.id) {
                return { ...favouriteArtwork, editing: true }
            }
            return favouriteArtwork
        })
        setFavouriteArtworks(updatedArtworks)
    }

    const deleteNote = artwork => {
        axios
            .put(
                `${API_URL}/${artwork.id}`,
                { note: "" },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            )
            .then(() => {
                const updatedArtworks = favouriteArtworks.map(favouriteArtwork => {
                    if (favouriteArtwork.id === artwork.id) {
                        return { ...favouriteArtwork, note: "", editing: false }
                    }
                    return favouriteArtwork
                })
                setFavouriteArtworks(updatedArtworks)
            })
            .catch(error => {
                console.error("Error deleting a note:", error.message)
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
                                            {artwork.title}
                                            <span className="favourites-date">
                                                , {artwork.date}
                                            </span>
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

                            <div className="favourites-note-container">
                                {artwork.editing && (
                                    <textarea
                                        rows="4"
                                        cols="16"
                                        className="favourites-note"
                                        type="text"
                                        name="note"
                                        value={note}
                                        onChange={handleNote}
                                        onKeyDown={e => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                // Prevent a new line from being entered
                                                e.preventDefault()
                                                saveNote(artwork)
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
                                )}
                                {artwork.note && !artwork.editing && (
                                    <textarea
                                        rows="4"
                                        cols="16"
                                        className="favourites-note"
                                        type="text"
                                        name="note"
                                        value={artwork.note}
                                        onChange={handleNote}
                                        readOnly
                                    />
                                )}
                                {artwork.note && (
                                    <div className="note-buttons">
                                        <button
                                            className="delete-note-button"
                                            onClick={() => deleteNote(artwork)}
                                            type="button">
                                            Delete
                                        </button>
                                        {artwork.editing ? (
                                            <button
                                                className="save-edit-note-button"
                                                onClick={() => saveNote(artwork)}
                                                type="button">
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                className="save-edit-note-button"
                                                onClick={() => editNote(artwork)}
                                                type="button">
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                )}
                                {!artwork.note && (
                                    <>
                                        {artwork.editing ? (
                                            <div className="note-buttons">
                                                <button
                                                    className="delete-note-button"
                                                    onClick={() => deleteNote(artwork)}
                                                    type="button">
                                                    Delete
                                                </button>
                                                <button
                                                    className="save-edit-note-button"
                                                    onClick={() => saveNote(artwork)}
                                                    type="button">
                                                    Save
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                className="add-note-button"
                                                onClick={() => editNote(artwork)}
                                                type="button">
                                                Add a note
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        </article>
                    ))}

                {selectedArtwork && (
                    <FavouriteDetails
                        favouriteArtworks={favouriteArtworks}
                        artwork={selectedArtwork}
                        index={selectedArtwork.index}
                        onClose={closeModal}
                        onDelete={handleDeleteArtwork}
                    />
                )}
            </div>
        )
    )
}

export default FavouritesPage
