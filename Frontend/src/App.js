import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { useState, useEffect } from "react";
import MoviePage from "./pages/MoviePage";
import MovieTheaterPage from "./pages/MovieTheaterPage";
import SeatsPage from "./pages/SeatsPage";
import TokenManager from "./utils/TokenManager";
import BookingPage from "./pages/BookingPage";
import PrivateRoute from "./utils/PrivateRoute";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("access_token"));
  }, []);
  return (
    <div className="max-w-screen-xl m-auto px-8">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<PrivateRoute child={<LoginPage setIsLoggedIn={setIsLoggedIn} />} reverse={true} />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/theater/:id" element={<MovieTheaterPage />} />
        <Route path="/seats/:id" element={<SeatsPage />} />
        <Route path="/bookings" element={<PrivateRoute child={<BookingPage />} />} />
      </Routes>
      <TokenManager />
    </div>
  );
}

export default App;
