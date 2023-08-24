import axios from "axios"
import API_URL from "./API_URL"

export const deleteFromFavourites = (artworkId, setFavouriteArtworks) => {
    return axios
        .delete(`${API_URL}/${artworkId}`)
        .then(() => {
            setFavouriteArtworks(artworks => artworks.filter(artwork => artwork.id !== artworkId))
        })
        .catch(error => {
            console.error(error.message)
        })
}
