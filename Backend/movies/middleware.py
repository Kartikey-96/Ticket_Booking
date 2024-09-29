from django.http import JsonResponse
from django.utils.deprecation import MiddlewareMixin
from rest_framework import permissions


class CustomHeaderMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Code to execute before the view is called
        if request.method == "POST" and not request.META.get("CSRF_COOKIE"):
            # Check if it's a POST request and CSRF_COOKIE is not present
            from django.http import JsonResponse

            return JsonResponse({"message": "CSRF token is missing."})
        return None  # Allow the request to continue processing

    def process_response(self, request, response):
        # Code to execute after the view is called
        response["name"] = "Hello from Custom Middleware"
        return response


class CustomPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request
