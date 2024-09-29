import React, { useEffect, useState } from "react";
import { bookingAPI } from "../api/Api";
import BookingCard from "../components/BookingCard";

function BookingPage() {
  const [bookings, setBookings] = useState([]);
  const [reCall, setRecall] = useState(false);
  useEffect(() => {
    const callAPI = async () => {
      try {
        const access_token = localStorage.getItem("access_token");
        const response = await bookingAPI("GET", access_token);
        if (response?.status === 200) {
          setBookings(response.data);
        } else {
          alert(response?.data?.message);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    };
    callAPI();
  }, [reCall]);
  return (
    <div className="bg-primary p-3 sm:py-6 sm:px-3 flex flex-col gap-3">
      {bookings && bookings?.length > 0 ? (
        bookings?.map((booking) => (
          <BookingCard
            booking={booking}
            key={booking?.id}
            reCall={reCall}
            setRecall={setRecall}
          />
        ))
      ) : (
        <div className="text-white text-center font-bold">No booking Found</div>
      )}
    </div>
  );
}

export default BookingPage;
