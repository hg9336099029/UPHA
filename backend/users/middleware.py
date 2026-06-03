from django.http import JsonResponse


class AdminRoleMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith('/api/admin/'):
            user = getattr(request, 'user', None)
            if not user or not user.is_authenticated or user.role != 'admin':
                return JsonResponse({'success': False, 'message': 'Admin access required.'}, status=403)

        return self.get_response(request)