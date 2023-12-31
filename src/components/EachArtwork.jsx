import { useState, useEffect, useContext } from "react"
import axios from "axios"
import ArtworkDetails from "./ArtworkDetails"
import { addToFavourites } from "../utils/addToFavourites"
import { deleteFromFavourites } from "../utils/deleteFromFavourites"
import Toast from "./Toast"
import API_URL from "../utils/API_URL"
import { AuthContext } from "../context/auth.context"
import "../styles/artworks.css"
import "../styles/toast.css"
import plus from "../assets/plus.svg"
import minus from "../assets/minus.svg"

function EachArtwork({ artworks, artwork, index }) {
    // State to hold detailed artwork information
    const [eachArtwork, setEachArtwork] = useState(null)
    // State to manage modal display
    const [modalOpen, setModalOpen] = useState(false)
    // State to manage "Added to favourites" toast
    const [showAddToast, setShowAddToast] = useState(false)
    // State to manage "Removed from favourites" toast
    const [showRemoveToast, setShowRemoveToast] = useState(false)
    // State to track if the artwork's image is valid to display
    const [isValidImage, setIsValidImage] = useState(false)
    // State to track artwork's favourite status
    const [isFavourite, setIsFavourite] = useState(false)

    const { isLoggedIn } = useContext(AuthContext)

    const tooltip = document.querySelectorAll(".tooltip")
    const allArtworks = [...document.querySelectorAll(".each-artwork")]

    // Function to handle tooltip position on the page
    const handleTooltip = e => {
        for (let i = 0; i <= tooltip.length; i++) {
            const tooltipWidth = tooltip[i]?.offsetWidth
            const pageWidth = window.innerWidth - 48

            let leftPosition = e.pageX + 30
            if (leftPosition + tooltipWidth > pageWidth) {
                leftPosition = e.pageX - tooltipWidth - 70
            }

            tooltip[i].style.left = leftPosition + "px"
            tooltip[i].style.top = e.pageY + "px"
        }
    }

    // Attach the handleTooltip function to mousemove event
    useEffect(() => {
        document.addEventListener("mousemove", handleTooltip, false)
        // Remove the event listener when the component unmounts
        return () => document.removeEventListener("mousemove", handleTooltip)
    })

    // Check if the artwork has a valid image
    useEffect(() => {
        if (eachArtwork) {
            fetch(`https://www.artic.edu/iiif/2/${eachArtwork.image_id}/full/843,/0/default.jpg`)
                .then(response => {
                    setIsValidImage(response.ok)
                })
                .catch(() => {
                    setIsValidImage(false)
                })
        }
    }, [eachArtwork])

    // Fetch the user's favourites and check if the artwork is among them
    useEffect(() => {
        const authToken = localStorage.getItem("authToken")
        axios
            .get(API_URL, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then(response => {
                const favouriteIds = response.data.map(artwork => artwork.id)
                if (favouriteIds.includes(eachArtwork.id)) {
                    setIsFavourite(true)
                }
            })
            .catch(error => console.error(error.message))
    }, [eachArtwork])

    // Fetch detailed artwork information
    useEffect(() => {
        axios
            .get(artwork.api_link)
            .then(response => setEachArtwork(response.data.data))
            .catch(error => console.error(error.message))
    }, [artwork.api_link])

    // Functions to open/close the modal for artwork details
    const openModal = () => {
        setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
    }

    // Function to toggle artwork's favourite status
    const handleToggleFavourites = () => {
        if (isFavourite) {
            deleteFromFavourites(eachArtwork.id)
                .then(() => {
                    setIsFavourite(false)
                    setShowRemoveToast(true)
                    setTimeout(() => {
                        setShowRemoveToast(false)
                    }, 3000)
                })
                .catch(error => {
                    console.error(error.message)
                })
        } else {
            addToFavourites(eachArtwork)
                .then(() => {
                    setIsFavourite(true)
                    setShowAddToast(true)
                    setTimeout(() => {
                        setShowAddToast(false)
                    }, 3000)
                })
                .catch(error => {
                    console.error(error.message)
                })
        }
    }

    // Effect to handle the fact that the cursor needs to point to each artwork on homepage
    // but also stop pointing when the details modal is open
    useEffect(() => {
        if (modalOpen) {
            allArtworks.forEach(artwork => artwork.classList.add("pointer-inactive"))
        } else {
            allArtworks.forEach(artwork => artwork.classList.remove("pointer-inactive"))
        }
    }, [modalOpen, allArtworks])

    return (
        eachArtwork &&
        isValidImage && (
            <article className={`each-artwork ${modalOpen ? "pointer-inactive" : ""}`}>
                <div className="tooltip">
                    <p className="each-artwork-artist">{eachArtwork.artist_title}</p>
                    <p className="each-artwork-title">
                        {eachArtwork.title}
                        <span className="each-artwork-date">, {eachArtwork.date_display}</span>
                    </p>
                </div>
                <div className="each-artwork-container">
                    {showAddToast && <Toast message="Added to favourites" />}
                    {showRemoveToast && <Toast message="Removed from favourites" />}
                    <img
                        className="each-artwork-img"
                        src={`https://www.artic.edu/iiif/2/${eachArtwork.image_id}/full/843,/0/default.jpg`}
                        alt={eachArtwork.thumbnail.alt_text}
                        onClick={openModal}
                    />
                    {isLoggedIn && (
                        <button className="add-button" onClick={handleToggleFavourites}>
                            {isFavourite ? (
                                <img src={minus} alt="Minus icon" />
                            ) : (
                                <img src={plus} alt="Plus icon" />
                            )}
                        </button>
                    )}
                </div>
                {modalOpen && (
                    <ArtworkDetails
                        artworks={artworks}
                        artwork={eachArtwork}
                        index={index}
                        onClose={closeModal}
                    />
                )}
            </article>
        )
    )
}

export default EachArtwork
