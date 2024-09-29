import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api/Api";
function MoviePage() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getMovies = async (id) => {
      try {
        const response = await axios.get(`${BASE_URL}movies/${id}/`);
        if (response.status === 200) {
          setMovie(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMovies(id);
  }, [id]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-primary p-5">
      {movie && movie ? (
        <>
          <div className="max-h-96">
            <img
              src={movie?.image}
              alt={movie?.title}
              className="w-full rounded-sm h-full object-contain"
            />
          </div>
          <div className="py-3 sm:px-10 text-white">
            <div>
              <h1 className="font-bold text-md sm:text-xl">{movie?.title}</h1>
              <p className="text-sm text-gray-200">
                Directed by {movie?.director}
              </p>
            </div>
            <div className="mt-1 sm:mt-4">
              <h3>
                Genre:
                <span className="text-sm text-gray-200 ml-2">
                  {movie?.genre}
                </span>
              </h3>
              <h3>
                Language:
                <span className="text-sm text-gray-200 ml-2">
                  {movie?.language}
                </span>
              </h3>
            </div>
            <div className="mt-1 sm:mt-4">
              <p className="text-sm text-gray-200">{movie?.description}</p>
            </div>
            <div className="mt-1 sm:mt-4">
              <h3>
                Rating:
                <span className="text-sm text-gray-200 ml-2">
                  {movie?.rating}/10
                </span>
              </h3>
            </div>
            <div className="mt-1 sm:mt-4">
              <Link to={`/theater/${movie?.id}`}>
                <button className="ticket-btn mt-3 w-full">Book Tickets</button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="text-white">Loading....</div>
      )}
    </div>
  );
}

export default MoviePage;
