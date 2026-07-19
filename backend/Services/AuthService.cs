using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Configuration;
using backend.Database.Context;
using backend.DTOs.Auth;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services;

/// <summary>
/// Handles all authentication logic: registration, login, and JWT generation.
/// </summary>
public class AuthService
{
    private readonly AppDbContext _db;
    private readonly JwtSettings _jwtSettings;

    public AuthService(AppDbContext db, IOptions<JwtSettings> jwtSettings)
    {
        _db = db;
        _jwtSettings = jwtSettings.Value;
    }

    // -------------------------------------------------------------------------
    // REGISTRATION
    // -------------------------------------------------------------------------

    /// <summary>
    /// Creates a new professor account.
    /// Returns null if the email is already registered.
    /// </summary>
    public async Task<AuthResponseDto?> RegisterProfessorAsync(RegisterProfessorDto dto)
    {
        // Check if email is already taken
        var exists = await _db.Professors.AnyAsync(p => p.Email == dto.Email);
        if (exists) return null;

        var professor = new Professor
        {
            Name = dto.Name,
            Email = dto.Email,
            // Never store plain text — BCrypt hashes the password
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        _db.Professors.Add(professor);
        await _db.SaveChangesAsync();

        return GenerateToken(professor.Id, professor.Name, professor.Email, "professor");
    }

    /// <summary>
    /// Creates a new student account and assigns them to a group via invitation code.
    /// Returns null if the email is taken or the invitation code is invalid.
    /// </summary>
    public async Task<AuthResponseDto?> RegisterStudentAsync(RegisterStudentDto dto)
    {
        // Check if email is already taken
        var exists = await _db.Students.AnyAsync(s => s.Email == dto.Email);
        if (exists) return null;

        // Find the group by invitation code
        var group = await _db.Groups
            .FirstOrDefaultAsync(g => g.InvitationCode == dto.InvitationCode && g.IsActive);

        // Invalid or inactive group code
        if (group is null) return null;

        var student = new Student
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            GroupId = group.Id,
            TotalXP = 0
        };

        _db.Students.Add(student);
        await _db.SaveChangesAsync();

        return GenerateToken(student.Id, student.Name, student.Email, "student");
    }

    // -------------------------------------------------------------------------
    // LOGIN
    // -------------------------------------------------------------------------

    /// <summary>
    /// Verifies professor credentials and returns a token if valid.
    /// Returns null if email not found or password is incorrect.
    /// </summary>
    public async Task<AuthResponseDto?> LoginProfessorAsync(LoginDto dto)
    {
        var professor = await _db.Professors
            .FirstOrDefaultAsync(p => p.Email == dto.Email);

        // Email not found or wrong password
        if (professor is null) return null;
        if (!BCrypt.Net.BCrypt.Verify(dto.Password, professor.PasswordHash)) return null;

        return GenerateToken(professor.Id, professor.Name, professor.Email, "professor");
    }

    /// <summary>
    /// Verifies student credentials and returns a token if valid.
    /// Returns null if email not found or password is incorrect.
    /// </summary>
    public async Task<AuthResponseDto?> LoginStudentAsync(LoginDto dto)
    {
        var student = await _db.Students
            .FirstOrDefaultAsync(s => s.Email == dto.Email);

        if (student is null) return null;
        if (!BCrypt.Net.BCrypt.Verify(dto.Password, student.PasswordHash)) return null;

        return GenerateToken(student.Id, student.Name, student.Email, "student");
    }

    // -------------------------------------------------------------------------
    // TOKEN GENERATION
    // -------------------------------------------------------------------------

    /// <summary>
    /// Generates a signed JWT token containing the user's id, email, and role.
    /// The token expires in 8 hours.
    /// </summary>
    private AuthResponseDto GenerateToken(int id, string name, string email, string role)
    {
        // Claims are the data stored inside the token
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, id.ToString()),
            new Claim(ClaimTypes.Email, email),
            new Claim(ClaimTypes.Role, role)
        };

        // Sign the token with our secret key
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var expiresAt = DateTime.UtcNow.AddHours(8);

        var token = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: claims,
            expires: expiresAt,
            signingCredentials: credentials
        );

        return new AuthResponseDto
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            ExpiresAt = expiresAt,
            Name = name,
            Email = email,
            Role = role
        };
    }
}