namespace Backend.Configuration
{
  // TODO : check if this with appsettings.json is secure when uploding to web
    public class CloudinarySettings
  {
    public const string SectionName ="Cloudinary";

    public string CloudName { get; set; } = string.Empty;
    public string ApiKey { get; set; } = string.Empty;
    public string ApiSecret { get; set; } = string.Empty;
  }
}