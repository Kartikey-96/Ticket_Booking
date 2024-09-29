import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, bookingAPI } from "../api/Api";
import { MdEventSeat } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function SeatsPage() {
  const navigate = useNavigate();
  const [seats, setSeats] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    const getMovies = async (id) => {
      try {
        const response = await axios.get(`${BASE_URL}theaterseat/${id}/`);
        if (response.status === 200) {
          setSeats(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getMovies(id);
  }, [id]);
  const seatId = selectedSeats.map((item) => item.id);
  const toggleSeat = (seat) => {
    if (seatId.includes(seat?.id)) {
      setSelectedSeats(selectedSeats.filter((data) => data?.id !== seat?.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };
  const handleProceed = async () => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      navigate("/login");
    }
    const data = { movie: seats?.movie, seats: seatId };
    try {
      const response = await bookingAPI("POST", access_token, data);
      if (response?.status === 201) {
        navigate("/bookings");
      } else {
        alert(response?.data?.message);
      }

      // Handle the response as needed
    } catch (error) {
      console.error("API Error:", error);
      // Handle errors
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="font-bold pb-2">{seats?.name}</div>
      </div>
      <div
        className="max-w-3xl m-auto h-20 mb-10 bg-gray-500 p-2"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)",
        }}>
        <div
          className="w-full h-full bg-primary relative"
          style={{
            clipPath: "polygon(3% 0%, 96% 0%, 80% 100%, 20% 100%)",
          }}></div>
      </div>
      <div className="max-w-lg m-auto text-center">
        <div className="grid grid-cols-6 gap-2">
          {seats?.seats?.length > 0 &&
            seats?.seats?.map((seat) => (
              <div className="flex flex-col" key={seat?.id}>
                <div
                  className={`flex flex-col justify-center items-center ${
                    selectedSeats.includes(seat) || seat?.is_reserved
                      ? "bg-red-700"
                      : "bg-green-600"
                  } py-2 rounded-lg cursor-pointer ${
                    seat.is_reserved ? "pointer-events-none" : ""
                  }`}
                  onClick={() => !seat.is_reserved && toggleSeat(seat)}>
                  <MdEventSeat className="font-bold text-3xl text-white" />
                  <p className="font-semibold text-md text-white">
                    {seat?.seat_number}
                  </p>
                </div>
                <p className="text-xs font-bold text-primary">
                  {seat?.price}
                  {"₹"}
                </p>
              </div>
            ))}
        </div>
        {seats?.seats?.length <= 0 && (
          <p className="font-semibold text-md text-black">No seats Here</p>
        )}
      </div>
      {selectedSeats?.length > 0 ? (
        <div className="price-div text-center">
          <div className="flex flex-col gap-2 text-white py-3 w-44">
            <div className="text-sm font-semibold">You have choose seats</div>
            <div className="w-full break-after-auto font-bold text-xl">
              {selectedSeats.map((item) => item.seat_number).join(", ")}
            </div>
          </div>
          <div className="flex flex-col gap-2 text-white py-3">
            <div className="text-sm font-semibold">Price</div>
            <div className="font-bold text-xl">
              {selectedSeats.reduce((prev, item) => prev + item.price, 0)}
              {" ₹"}
            </div>
          </div>
          <div className="py-3">
            <button className="proceed-btn" onClick={handleProceed}>
              Proceed
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default SeatsPage;
