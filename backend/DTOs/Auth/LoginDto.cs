using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Auth;

/// <summary>
/// Data received from the frontend when a user logs in.
/// Used for both professors and students — role is determined by which endpoint is called.
/// </summary>
public class LoginDto
{
    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Password is required.")]
    public string Password { get; set; } = string.Empty;
}