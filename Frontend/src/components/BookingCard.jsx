import React from "react";
import { formatDate } from "../utils/utils";
import { MdEventSeat } from "react-icons/md";
import { bookingAPI } from "../api/Api";
import { useNavigate } from "react-router-dom";

function BookingCard({ booking, reCall, setRecall }) {
  const navigate = useNavigate();
  const handelCancel = async (id) => {
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await bookingAPI("DELETE", access_token, {}, id);
      if (response?.status === 200) {
        setRecall(!reCall);
        navigate("/bookings", { replace: true });
      } else {
        console.log(response?.data?.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row bg-gray-700 rounded-sm p-2 items-center sm:justify-between gap-3">
      <div>
        <img
          src={booking?.movie?.image}
          alt={booking?.movie?.title}
          className="w-auto sm:w-20 rounded-sm"
        />
      </div>
      <div className="flex flex-col text-center text-white font-semibold text-sm">
        <p>{booking?.movie?.title}</p>
        <p>Directed by {booking?.movie?.director}</p>
        <p>Released on {formatDate(booking?.movie?.release_date, false)}</p>
        <div className="flex flex-row justify-center gap-2">
          <p>{booking?.movie?.rating} Rating</p>|
          <p>{(booking?.movie?.movie_length / 60).toFixed(1)} Hours</p>|
          <p>{booking?.movie?.language}</p>
        </div>
      </div>
      <div className="flex flex-row gap-1 justify-center">
        {booking?.seats.map((seat) => (
          <div key={seat?.id} className="flex flex-col text-white text-center">
            <MdEventSeat className="font-bold text-3xl" />
            <p className="font-bold text-md">{seat?.seat_number}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 text-center font-bold text-md text-white">
        <div>Total Amount</div>
        <div>
          {booking?.total_cost}
          {" ₹"}
        </div>
      </div>
      <div>
        <button
          className="ticket-btn mt-3 w-full"
          onClick={() => handelCancel(booking?.id)}>
          Cancel Tickets
        </button>
      </div>
    </div>
  );
}

export default BookingCard;
