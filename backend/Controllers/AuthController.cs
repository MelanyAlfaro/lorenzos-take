using backend.DTOs.Auth;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

/// <summary>
/// Handles authentication endpoints for both professors and students.
/// All endpoints here are public — no token required to access them.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    // POST /api/auth/register/professor
    [HttpPost("register/professor")]
    public async Task<IActionResult> RegisterProfessor([FromBody] RegisterProfessorDto dto)
    {
        var result = await _authService.RegisterProfessorAsync(dto);

        if (result is null)
            return Conflict(new { message = "Email is already registered." });

        return CreatedAtAction(nameof(RegisterProfessor), result);
    }

    // POST /api/auth/register/student
    [HttpPost("register/student")]
    public async Task<IActionResult> RegisterStudent([FromBody] RegisterStudentDto dto)
    {
        var result = await _authService.RegisterStudentAsync(dto);

        if (result is null)
            return BadRequest(new { message = "Invalid invitation code or email already registered." });

        return CreatedAtAction(nameof(RegisterStudent), result);
    }

    // POST /api/auth/login/professor
    [HttpPost("login/professor")]
    public async Task<IActionResult> LoginProfessor([FromBody] LoginDto dto)
    {
        var result = await _authService.LoginProfessorAsync(dto);

        if (result is null)
            return Unauthorized(new { message = "Invalid email or password." });

        return Ok(result);
    }

    // POST /api/auth/login/student
    [HttpPost("login/student")]
    public async Task<IActionResult> LoginStudent([FromBody] LoginDto dto)
    {
        var result = await _authService.LoginStudentAsync(dto);

        if (result is null)
            return Unauthorized(new { message = "Invalid email or password." });

        return Ok(result);
    }
}