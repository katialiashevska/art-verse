import React, { useState, useEffect } from "react"
import axios from "axios"
import EachArtwork from "../components/EachArtwork"

function FavouritesPage() {
    const [favouriteArtworks, setFavouriteArtworks] = useState(null)

    useEffect(() => {
        axios
            .get("https://art-verse-backend.adaptable.app/favouriteArtworks")
            .then(response => setFavouriteArtworks(response.data))
            .catch(error => console.error(error.message))
    }, [])

    if (!favouriteArtworks) {
        return <p>Loading favourite artworks...</p>
    }

    return (
        <div>
            <h1>My favourites</h1>
            {favouriteArtworks.map(artwork => (
                <article key={artwork.id} className="each-artwork">
                    <img className="artwork-img" src={artwork.img} alt={artwork.alt_text} />
                    <p className="artwork-title">
                        {artwork.title}, {artwork.date}
                    </p>
                    <p className="artwork-artist">{artwork.artist}</p>
                    <p>{artwork.medium}</p>
                    <p>{artwork.dimensions}</p>
                </article>
            ))}
        </div>
    )
}

export default FavouritesPage
