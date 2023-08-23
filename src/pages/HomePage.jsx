import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import EachArtwork from "../components/EachArtwork"
import "../styles/navbar.css"
import "../styles/loading.css"
import "../styles/artworks.css"

function HomePage() {
    const [artworks, setArtworks] = useState([])
    const [page, setPage] = useState(1)
    const [isLoadingPage, setIsLoadingPage] = useState(true)
    const [isLoadingData, setIsLoadingData] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsLoadingPage(false)
        }, 5000)
    }, [])

    const fetchData = () => {
        if (page > 30) {
            return
        }

        setIsLoadingData(true)

        axios
            .get(`https://api.artic.edu/api/v1/artworks/search?q=modern&limit=100&page=${page}`)
            .then(response => {
                setArtworks(previousArtworks => [...previousArtworks, ...response.data.data])
                setPage(previousPage => previousPage + 1)
                setIsLoadingData(false)
            })
            .catch(error => {
                console.error(error.message)
                setIsLoadingData(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight ||
            isLoadingData
        ) {
            return
        }
        fetchData()
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [isLoadingData])

    return (
        artworks.length > 0 && (
            <div>
                <Navbar />
                {isLoadingPage && (
                    <div id="loading-container">
                        <p id="loading-text">Loading artworks</p>
                        <div id="progress-bar"></div>
                    </div>
                )}
                {!isLoadingPage && (
                    <div id="all-artworks">
                        {artworks.map(artwork => (
                            <EachArtwork key={artwork.id} artwork={artwork} />
                        ))}
                    </div>
                )}
            </div>
        )
    )
}

export default HomePage
