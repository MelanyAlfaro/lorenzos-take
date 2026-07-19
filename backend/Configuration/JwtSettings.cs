namespace backend.Configuration;

/// <summary>
/// Strongly typed configuration for JWT token generation and validation.
/// Values are loaded from User Secrets in development and environment variables in production.
/// </summary>
public class JwtSettings
{
    public const string SectionName = "Jwt";

    public string SecretKey { get; set; } = string.Empty;
    public string Issuer { get; set; } = string.Empty;
    public string Audience { get; set; } = string.Empty;
}