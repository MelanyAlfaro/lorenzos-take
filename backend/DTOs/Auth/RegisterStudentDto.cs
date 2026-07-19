using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Auth;

/// <summary>
/// Data received from the frontend when a student creates an account.
/// The invitation code is used to assign the student to the correct group.
/// </summary>
public class RegisterStudentDto
{
    [Required(ErrorMessage = "Name is required.")]
    [MaxLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    [MaxLength(150, ErrorMessage = "Email cannot exceed 150 characters.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Password is required.")]
    [MinLength(8, ErrorMessage = "Password must be at least 8 characters.")]
    public string Password { get; set; } = string.Empty;

    [Required(ErrorMessage = "Invitation code is required.")]
    [MaxLength(10, ErrorMessage = "Invalid invitation code.")]
    public string InvitationCode { get; set; } = string.Empty;
}