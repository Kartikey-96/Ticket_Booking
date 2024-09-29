import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../api/Api";
import TheaterMovieCard from "../components/TheaterMovieCard";
import { formatDate } from "../utils/utils";
function MovieTheaterPage() {
  const [theater, setTheater] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getMovies = async (id) => {
      try {
        const response = await axios.get(`${BASE_URL}moviestheater/${id}/`);
        if (response.status === 200) {
          setTheater(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMovies(id);
  }, [id]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 bg-gray-800 p-5">
      <div className="md:col-span-3 px-0 sm:px-2 order-2 sm:order-1">
        {theater?.theaters?.length > 0 ? (
          theater?.theaters?.map((theater) => (
            <div
              key={theater?.id}
              className="text-white bg-gray-900 p-5 mt-3 rounded-md">
              <div className="flex flex-col gap-5 sm:gap-0 sm:flex-row items-center justify-between">
                <div className="w-auto sm:w-20 font-semibold">
                  <p>{theater?.name}</p>
                </div>
                <div className="bg-white text-black py-1 px-2 rounded-full">
                  {formatDate(theater?.movie_timing)}
                </div>
                <div>
                  <Link to={`/seats/${theater?.id}`}>
                    <button className="ticket-btn mt-3 w-full">
                      View Seats
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-white font-bold text-center">No Theaters</h1>
        )}
      </div>
      <div className="md:col-span-1 mt-3 sm:mt-1 order-1 sm:order-2">
        <TheaterMovieCard theater={theater} />
      </div>
    </div>
  );
}

export default MovieTheaterPage;
