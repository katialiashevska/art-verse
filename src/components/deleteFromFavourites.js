import axios from "axios"
import API_URL from "../API_URL"

export const deleteFromFavourites = (artworkId, setFavouriteArtworks) => {
    return axios
        .delete(`${API_URL}/${artworkId}`)
        .then(() => {
            alert("Artwork removed from favourites.")
            setFavouriteArtworks(artworks => artworks.filter(artwork => artwork.id !== artworkId))
        })
        .catch(error => {
            console.error(error.message)
            throw new Error("Failed to delete artwork from favourites.")
        })
}
