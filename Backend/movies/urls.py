from .views import *
from django.urls import path

urlpatterns = [
    path("user/signup/", SignupView.as_view(), name="Sign-Up-View"),
    path("user/login/", SignInView.as_view(), name="Sign-In-View"),
    path("movies/", MoviesView.as_view(), name="Movies-View"),
    path("movies/<int:id>/", MoviesView.as_view(), name="Movies-Detail-View"),
    path("theaters/", TheaterView.as_view(), name="Theater-View"),
    path("theaters/<int:id>/", TheaterView.as_view(), name="Theater-Detail-View"),
    path("seats/", SeatsView.as_view(), name="Seats-View"),
    path("seats/<int:id>/", SeatsView.as_view(), name="Seats-Details-View"),
    path("moviestheater/<int:movie_id>/",
         TheaterMovie.as_view(), name="Movie-Theater-View"),
    path("theaterseat/<int:id>/", TheaterSeats.as_view(), name="Theater-Seats"),
    path("booking/", BookingView.as_view(), name="BookingView"),
    path("booking/<int:id>/", BookingView.as_view(), name="Booking-detail-View"),
    path("ticketcancel/<int:id>/<int:seat_id>/",
         BookingRemoveSeat.as_view(), name="Booking-Remove-Seat"),
    path("refresh/", RefreshTokenView.as_view(), name="Refresh-Token-View"),
]
