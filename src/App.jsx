import "./App.css"
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import FavouritesPage from "./pages/FavouritesPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import IsPrivate from "./components/IsPrivate"
import IsAnon from "./components/IsAnon"

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/favourites"
                    element={
                        <IsPrivate>
                            <FavouritesPage />
                        </IsPrivate>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <IsAnon>
                            <LoginPage />
                        </IsAnon>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <IsAnon>
                            <SignupPage />
                        </IsAnon>
                    }
                />
            </Routes>
        </div>
    )
}

export default App
