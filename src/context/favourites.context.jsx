import React, { useContext, useState } from "react"

const FavouritesContext = React.createContext()

export const useFavourites = () => {
    return useContext(FavouritesContext)
}

export const FavouritesProvider = ({ children }) => {
    const [favouriteArtworks, setFavouriteArtworks] = useState([])

    const addFavourite = artwork => {
        setFavouriteArtworks(prevArtworks => [...prevArtworks, artwork])
    }

    const removeFavourite = artworkId => {
        setFavouriteArtworks(prevArtworks =>
            prevArtworks.filter(artwork => artwork.id !== artworkId)
        )
    }

    const isFavourite = artworkId => {
        return favouriteArtworks.some(artwork => artwork.id === artworkId)
    }

    return (
        <FavouritesContext.Provider
            value={{ favouriteArtworks, addFavourite, removeFavourite, isFavourite }}>
            {children}
        </FavouritesContext.Provider>
    )
}
