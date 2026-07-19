namespace backend.DTOs.Auth;

/// <summary>
/// Returned to the frontend after a successful login or registration.
/// The frontend stores the token and sends it in every subsequent request.
/// </summary>
public class AuthResponseDto
{
    /// <summary>JWT token the frontend must include in all future requests.</summary>
    public string Token { get; set; } = string.Empty;

    /// <summary>Token expiration so the frontend knows when to re-login.</summary>
    public DateTime ExpiresAt { get; set; }

    /// <summary>Basic user info so the frontend can display the user's name.</summary>
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}