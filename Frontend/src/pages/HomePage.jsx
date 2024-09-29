import React, { useEffect, useState } from "react";
import Paginator from "../components/Paginator";
import { allMovies } from "../api/Api";
import MovieCard from "../components/MovieCard";
function HomePage() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(null);
  const [rating, setRating] = useState(null);
  const [genre, setGenre] = useState(null);
  const [language, setLanguage] = useState(null);
  const [data, setData] = useState();
  useEffect(() => {
    const params = { page, query, rating, genre, language };
    const fetchDataAsync = async (params) => {
      try {
        const apiData = await allMovies(params);
        setData(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataAsync(params);
  }, [page, query, rating, genre, language]);
  return (
    <div>
      {/* Filter section */}
      <div className="bg-red-400 p-4 shadow-md rounded-md mb-4 flex flex-wrap gap-4 ">
        <input
          type="text"
          placeholder="Search by query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="filter-input border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2 md:w-1/4"
        />

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="filter-select border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2 md:w-1/4"
        >
          <option value="">Select Rating</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="filter-select border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2 md:w-1/4"
        >
          <option value="">Select Genre</option>
          <option value="action">Action</option>
          <option value="drama">Drama</option>
          <option value="comedy">Comedy</option>
          <option value="horror">Horror</option>
        </select>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="filter-select border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2 md:w-1/4"
        >
          <option value="">Select Language</option>
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
        </select>
      </div>
      <Paginator
        currentPage={page}
        totalPages={data?.total_page}
        onPageChange={setPage}
      ></Paginator>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-10">
        {data?.data?.length > 0 ? (
          data?.data?.map((movie, i) => <MovieCard key={i} data={movie} />)
        ) : (
          <>Loading....</>
        )}
      </div>
    </div>
  );
}

export default HomePage;
