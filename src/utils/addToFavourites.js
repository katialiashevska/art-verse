import axios from "axios"

export const addToFavourites = (artwork, setIsFavourite) => {
    const newArtwork = {
        id: artwork.id,
        title: artwork.title,
        artist: artwork.artist_display,
        date: artwork.date_display,
        medium: artwork.medium_display,
        dimensions: artwork.dimensions,
        altText: artwork.thumbnail.alt_text,
        img: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`,
    }

    return axios
        .post("https://art-verse-backend.adaptable.app/favouriteArtworks", newArtwork)
        .then(() => {
            setIsFavourite(true)
        })
        .catch(error => {
            console.error(error.message)
        })
}