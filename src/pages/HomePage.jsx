import { useState, useEffect, useContext } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import EachArtwork from "../components/EachArtwork"
import Toast from "../components/Toast"
import { AuthContext } from "../context/auth.context"
import "../styles/navbar.css"
import "../styles/loading.css"
import "../styles/artworks.css"
import "../styles/toast.css"

function HomePage() {
    const [artworks, setArtworks] = useState([])
    const [page, setPage] = useState(1)
    const [isLoadingPage, setIsLoadingPage] = useState(true)
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const { isLoggedIn, user } = useContext(AuthContext)

    useEffect(() => {
        setTimeout(() => {
            setIsLoadingPage(false)
        }, 7000)
    }, [])

    const fetchData = () => {
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
        // Check if it's the user's first time logging in
        const firstTimeLoggedIn = localStorage.getItem("firstTimeLoggedIn")
        if (isLoggedIn && firstTimeLoggedIn === "true") {
            setShowToast(true)
            localStorage.removeItem("firstTimeLoggedIn")
        }
    }, [isLoggedIn])

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight ||
            isLoadingData ||
            artworks.length === 0
        ) {
            return
        }
        fetchData()
    }

    useEffect(() => {
        // Add or remove scroll event listener based on isLoadingData and artworks length
        if (!isLoadingData && artworks.length > 0) {
            window.addEventListener("scroll", handleScroll)
        } else {
            window.removeEventListener("scroll", handleScroll)
        }

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [isLoadingData, artworks])

    return (
        artworks.length > 0 && (
            <div>
                <Navbar />
                {showToast && <Toast message={`Welcome ${user.name}`} />}
                {isLoadingPage && (
                    <div id="loading-container">
                        <p id="loading-text">Loading artworks</p>
                        <div id="progress-bar"></div>
                    </div>
                )}
                {!isLoadingPage && (
                    <div id="all-artworks" loading="lazy">
                        {artworks.map((artwork, index) => (
                            <EachArtwork key={index} artwork={artwork} />
                        ))}
                    </div>
                )}
            </div>
        )
    )
}

export default HomePage
