from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from django.core.paginator import Paginator
from rest_framework.views import APIView
from datetime import datetime, timedelta
from .middleware import CustomPermission
from django.db.models import Sum, Q
from rest_framework import status
from django.conf import settings
from .serializers import *
from .models import *
import json

# Create your views here.


class SignupView(APIView):
    def post(self, request):
        data = json.loads(request.body)
        userExist = User.objects.filter(email=data["email"])
        if not userExist:
            serializer = UserSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Account created successfully"}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": "Account already exist"}, status=status.HTTP_400_BAD_REQUEST)


class SignInView(APIView):
    permission_classes = [CustomPermission]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh_token = RefreshToken.for_user(user)
            access_token_exp = refresh_token.access_token.payload["exp"]
            return Response(
                {
                    "refresh_token": str(refresh_token),
                    "access": str(refresh_token.access_token),
                    "access_token_exp": access_token_exp,
                },
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MoviesView(APIView):
    def get_permissions(self):
        if self.request.method in ["POST", "PUT", "DELETE"]:
            return [IsAuthenticated(), IsAdminUser()]
        return []

    def get(self, request, id=None):
        if id:
            try:
                movie = Movie.objects.get(id=id)
                serializer = MovieSerializer(movie).data
                return Response(serializer, status=status.HTTP_200_OK)
            except Movie.DoesNotExist:
                return Response({"message": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)
        query = request.GET.get("query", None)
        rating = request.GET.get("rating", None)
        genre = request.GET.get("genre", None)
        language = request.GET.get("language", None)
        page_no = request.GET.get("page", 1)
        allMovies = Movie.objects.all().order_by("-id")
        if query:
            allMovies = allMovies.filter(
                Q(title__icontains=query) | Q(description__icontains=query))
        if rating:
            allMovies = allMovies.filter(rating__gte=int(rating))
        if genre:
            allMovies = allMovies.filter(genre__icontains=genre)
        if language:
            allMovies = allMovies.filter(
                Q(language__in=language.split("|")) | Q(language__icontains=language))
        paginate = Paginator(allMovies, 8)
        page = paginate.get_page(page_no)
        page_data = page.object_list
        serializer = MovieSerializer(page_data, many=True).data
        return Response(
            {
                "count": allMovies.count(),
                "total_page": paginate.num_pages,
                "next": page.has_next(),
                "pervious": page.has_previous(),
                "data": serializer,
            },
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        data = request.data
        serializer = MovieSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None):
        try:
            movie = Movie.objects.get(id=id)
        except Movie.DoesNotExist:
            return Response({"message": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = MovieSerializer(movie, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        try:
            movie = Movie.objects.get(id=id)
            movie.delete()
            return Response({"message": "Movie removed succesfully."}, status=status.HTTP_200_OK)
        except Movie.DoesNotExist:
            return Response({"message": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)


class TheaterView(APIView):
    def get_permissions(self):
        if self.request.method in ["POST", "PUT", "DELETE"]:
            return [IsAuthenticated(), IsAdminUser()]
        return []

    def post(self, request):
        data = request.data
        serializer = TheaterSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None):
        try:
            theater = Theater.objects.get(id=id)
        except Theater.DoesNotExist:
            return Response({"message": "Theater not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = TheaterSerializer(theater, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        try:
            theater = Theater.objects.get(id=id)
            theater.delete()
            return Response({"message": "Theater has been removed"}, status=status.HTTP_200_OK)
        except Movie.DoesNotExist:
            return Response({"message": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)


class SeatsView(APIView):
    def get_permissions(self):
        if self.request.method in ["POST", "PUT", "DELETE"]:
            return [IsAuthenticated(), IsAdminUser()]
        return []

    def post(self, request):
        data = request.data
        serializer = SeatSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None):
        try:
            seat = Seat.objects.get(id=id)
        except Seat.DoesNotExist:
            return Response({"message": "Seat not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = SeatSerializer(seat, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        try:
            seat = Seat.objects.get(id=id)
            seat.delete()
            return Response({"message": "Seat has been removed"}, status=status.HTTP_200_OK)
        except Movie.DoesNotExist:
            return Response({"message": "Seat not found"}, status=status.HTTP_404_NOT_FOUND)


class TheaterMovie(APIView):
    def get(self, request, movie_id):
        try:
            movie = Movie.objects.get(id=movie_id)
            serializer = MovieSerializer(movie).data
            theaters = Theater.objects.filter(movie=movie_id).values()
            serializer["theaters"] = list(theaters)
            return Response(serializer, status=status.HTTP_200_OK)
        except Movie.DoesNotExist:
            return Response({"message": "Theater not found"}, status=status.HTTP_404_NOT_FOUND)


class TheaterSeats(APIView):
    def get(self, request, id):
        try:
            theater = Theater.objects.get(id=id)
            serializer = TheaterSerializer(theater).data
            seats = (
                Seat.objects.filter(theater=id)
                .order_by(
                    "id",
                )
                .values("id", "seat_number", "is_reserved", "category", "price")
            )
            serializer["seats"] = list(seats)
            return Response(serializer, status=status.HTTP_200_OK)
        except Movie.DoesNotExist:
            return Response({"message": "Theater not found"}, status=status.HTTP_404_NOT_FOUND)


class BookingView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request, id=None):
        if id:
            try:
                booking = Booking.objects.get(user=request.user.id, id=id)
                serializer = BookDetailSerializer(booking).data
                return Response(serializer, status=status.HTTP_200_OK)
            except Booking.DoesNotExist:
                return Response({"message": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)
        bookings = Booking.objects.select_related(
            "movie").filter(user=request.user.id)
        serializer = BookDetailSerializer(bookings, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)

    def post(self, request):
        seats = request.data.get("seats", [])
        allSeats = Seat.objects.filter(id__in=seats)
        is_reserved = allSeats.filter(is_reserved__in=[True]).exists()
        if is_reserved:
            return Response({"error": "Some seats are already reserved."}, status=status.HTTP_400_BAD_REQUEST)
        data = request.data

        data["user"] = request.user.id
        total_price = allSeats.aggregate(sum=Sum("price"))
        data["total_cost"] = total_price["sum"]
        serializer = BookingSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            Seat.objects.filter(id__in=seats).update(is_reserved=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            booking = Booking.objects.get(id=id, user=request.user.id)
            unreserved = booking.seats.values_list("id", flat=True)
            Seat.objects.filter(id__in=list(unreserved)
                                ).update(is_reserved=False)
            booking.delete()
            return Response({"message": "Booking has been cancelled."}, status=status.HTTP_200_OK)
        except Booking.DoesNotExist:
            return Response({"message": "Booking does not exist"}, status=status.HTTP_404_NOT_FOUND)


class BookingRemoveSeat(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, id, seat_id):
        try:
            try:
                booking = Booking.objects.get(user=request.user.id, pk=id)
            except Booking.DoesNotExist:
                return Response({"message": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)
            try:
                seat = Seat.objects.get(pk=seat_id)
                booking.seats.remove(seat)
                booking.total_cost -= seat.price
                seat.is_reserved = False
            except Seat.DoesNotExist:
                return Response({"message": "Seat not found"}, status=status.HTTP_404_NOT_FOUND)
            booking.save()
            seat.save()
            if booking.seats.count() < 1:
                booking.delete()
            return Response({"Message": "Seat has been cancelled."}, status=status.HTTP_200_OK)
        except Booking.DoesNotExist:
            return Response({"message": "Booking does not exist"}, status=status.HTTP_404_NOT_FOUND)


class RefreshTokenView(APIView):
    def post(self, request, *args, **kwargs):
        # Get the refresh token from the request
        refresh_token = request.data.get("refresh_token")
        if not refresh_token:
            return Response({"error": "No refresh token provided."}, status=status.HTTP_404_NOT_FOUND)
        # Validate the refresh token
        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            access_token_exp = refresh.access_token.payload["exp"]
            return Response({"access_token": access_token, "access_token_exp": access_token_exp}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Invalid refresh token."}, status=status.HTTP_401_UNAUTHORIZED)
