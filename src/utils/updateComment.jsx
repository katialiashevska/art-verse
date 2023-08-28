import axios from "axios"
import API_URL from "./API_URL"

export const updateCommentInFavourites = (artworkId, comment) => {
    return axios.put(`${API_URL}/${artworkId}`, { comment })
}
