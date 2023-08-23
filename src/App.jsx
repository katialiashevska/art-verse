import "./App.css"
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import FavouritesPage from "./pages/FavouritesPage"
import LoginPage from "./pages/LoginPage"

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/favourites" element={<FavouritesPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </div>
    )
}

export default App
