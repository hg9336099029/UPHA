from django.http import JsonResponse


class AdminRoleMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path.startswith('/api/admin/'):
            user = getattr(request, 'user', None)
            print(f"AdminRoleMiddleware: path={request.path}, user={user}, is_auth={user.is_authenticated if user else False}, cookies={request.COOKIES}")
            if not user or not user.is_authenticated or getattr(user, 'role', '') != 'admin':
                return JsonResponse({'success': False, 'message': f'Admin access required. User: {user}'}, status=403)

        return self.get_response(request)