import React from "react";
import { formatDate } from "../utils/utils";

function TheaterMovieCard({ theater }) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md flex flex-col">
      <img
        src={theater?.image || "https://via.placeholder.com/150"}
        alt={theater?.title}
        className="w-full h-80 object-fill rounded-md mb-3 "
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/150";
        }}
      />
      <h3 className="text-white text-lg font-semibold mb-2 text-center">
        {theater?.title}
      </h3>
      <p className="text-gray-200 text-sm mb-1 text-center">
        Release Date: {formatDate(theater?.release_date)}
      </p>
      <p className="text-gray-200 text-sm mb-1 text-center">
        Director: {theater?.director}
      </p>
      <p className="text-gray-200 text-sm mb-1 text-center">
        Rating: {theater?.rating}/10
      </p>
    </div>
  );
}

export default TheaterMovieCard;
