using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Database.Context;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}
  
    // Add DbSet properties for each model to represent the corresponding tables in the database.
    public DbSet<Professor> Professors => Set<Professor>();
    public DbSet<Group> Groups => Set<Group>();
    public DbSet<Student> Students => Set<Student>();
    public DbSet<QuestCompletion> QuestCompletions => Set<QuestCompletion>();
    public DbSet<SpeakingSubmission> SpeakingSubmissions => Set<SpeakingSubmission>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
     modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
  }
}