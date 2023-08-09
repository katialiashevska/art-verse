import axios from "axios"

export const addToFavourites = artwork => {
    const newArtwork = {
        id: artwork.id,
        title: artwork.title,
        artist: artwork.artist_display,
        date: artwork.date_display,
        medium: artwork.medium_display,
        dimensions: artwork.dimensions,
        alt_text: artwork.thumbnail.alt_text,
        img: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`,
    }

    return axios
        .post("https://art-verse-backend.adaptable.app/favouriteArtworks", newArtwork)
        .then(() => {
            return "Artwork added to favourites!"
        })
        .catch(error => {
            console.error(error.message)
            alert("Failed to add artwork to favourites.")
            throw new Error("Failed to add artwork to favourites.")
        })
}
