import axios from "axios"
import API_URL from "./API_URL"

export const deleteFromFavourites = (artworkId, setFavouriteArtworks) => {
    const authToken = localStorage.getItem("authToken")

    return axios
        .delete(`${API_URL}/${artworkId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(() => {
            setFavouriteArtworks(artworks => artworks.filter(artwork => artwork.id !== artworkId))
        })
        .catch(error => {
            console.error("Error deleting artwork:", error)
        })
}
