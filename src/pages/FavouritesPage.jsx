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
                <article key={artwork.id} className="favourites-artwork">
                    <hr />
                    <div className="favourites-img-container">
                        <img className="favourites-img" src={artwork.img} alt={artwork.alt_text} />
                    </div>
                    <p className="favourites-title">
                        {artwork.title}, {artwork.date}
                    </p>
                    <p className="favourites-artist">{artwork.artist}</p>
                    <p className="favourites-medium">{artwork.medium}</p>
                    <p className="favourites-dimensions">{artwork.dimensions}</p>
                </article>
            ))}
        </div>
    )
}

export default FavouritesPage
