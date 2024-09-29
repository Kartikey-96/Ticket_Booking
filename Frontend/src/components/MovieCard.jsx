import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ data }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md flex flex-col">
      <Link to={`/movie/${data?.id}`}>
        <img
          src={data?.image || "https://via.placeholder.com/150"}
          alt={data?.title}
          className="w-full h-80 object-fill rounded-md mb-3 "
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150";
          }}
        />
        <h3 className="text-white text-lg font-semibold mb-2 text-center">
          {data?.title}
        </h3>
        <p className="text-gray-200 text-sm mb-1 text-center">
          Release Date: {formatDate(data?.release_date)}
        </p>
        <p className="text-gray-200 text-sm mb-1 text-center">
          Director: {data?.director}
        </p>
        <p className="text-gray-200 text-sm mb-1 text-center">
          Rating: {data?.rating}/10
        </p>
      </Link>
      <Link to={`/theater/${data?.id}`}>
        <button className="ticket-btn mt-3 w-full">Book Tickets</button>
      </Link>
    </div>
  );
}

export default MovieCard;
