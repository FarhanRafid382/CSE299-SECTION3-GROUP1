from rest_framework import permissions

class IsCustomerUser(permissions.BasePermission):
    """
    Allows access only to authenticated users who are explicitly marked as customers.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            getattr(request.user, 'is_customer', False)
        )

class IsSupportAgentUser(permissions.BasePermission):
    """
    Allows access only to support staff members handling chats or inventory adjustments.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            (getattr(request.user, 'is_support_agent', False) or request.user.is_staff)
        )

class IsOwnerOrStaff(permissions.BasePermission):
    """
    Object-level permission to ensure users can only read/edit their own data 
    (like profiles, carts, or orders), while allowing support staff access.
    """
    def has_object_permission(self, request, view, obj):
        # Allow administrators or support staff full visibility
        if request.user.is_staff or getattr(request.user, 'is_support_agent', False):
            return True
        
        # Check if the object belongs to the requesting user.
        # This handles objects where user is stored as 'user' or 'user_id'
        if hasattr(obj, 'user'):
            return obj.user == request.user
        elif hasattr(obj, 'created_by_id'):
            return obj.created_by_id == request.user
            
        return False