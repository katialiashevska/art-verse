import axios from "axios"
import API_URL from "./API_URL"

export const addToFavourites = (artwork, setIsFavourite) => {
    const newArtwork = {
        id: artwork.id,
        title: artwork.title,
        artist: artwork.artist_display,
        date: artwork.date_display,
        medium: artwork.medium_display,
        dimensions: artwork.dimensions,
        altText: artwork.thumbnail.alt_text,
        image: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`,
        note: "",
    }

    const authToken = localStorage.getItem("authToken")

    return axios
        .post(API_URL, newArtwork, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(() => {
            setIsFavourite(true)
        })
        .catch(error => {
            console.error(error.message)
        })
}
