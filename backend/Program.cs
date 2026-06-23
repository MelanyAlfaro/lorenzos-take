using backend.Database.Context;
using backend.Configuration;
using backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// --- Database ---
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// --- Cloudinary Configuration ---
builder.Services.Configure<CloudinarySettings>(
    builder.Configuration.GetSection(CloudinarySettings.SectionName));

// --- Services ---
builder.Services.AddScoped<IStorageService, CloudinaryStorageService>();

// --- Controllers ---
builder.Services.AddControllers();

// --- CORS ---
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins(
                "http://localhost:5173",
                "http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors("AllowFrontend");
app.MapControllers();

// Health check — visiting /health confirms the server is running
app.MapGet("/health", () => "Lorenzo's Take API is running.");

app.Run();