// Database/Configurations/ProfessorConfiguration.cs
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Database.Configurations;

/// <summary>
/// Defines the database schema and constraints for the Professor entity.
/// Professors are the teachers who manage groups and review student submissions.
/// </summary>
public class ProfessorConfiguration : IEntityTypeConfiguration<Professor>
{
    public void Configure(EntityTypeBuilder<Professor> builder)
    {
        // --- Primary Key ---
        builder.HasKey(p => p.Id);

        // --- Properties ---
        builder.Property(p => p.Name)
            .IsRequired()
            .HasMaxLength(100)
            .HasComment("Full name of the professor");

        builder.Property(p => p.Email)
            .IsRequired()
            .HasMaxLength(150)
            .HasComment("Used for login. Must be unique across all professors");

        builder.Property(p => p.PasswordHash)
            .IsRequired()
            .HasMaxLength(255)
            .HasComment("Bcrypt hash of the password. Never store plain text passwords");

        // --- Indexes ---
        // Email must be unique — no two professors can share the same email
        builder.HasIndex(p => p.Email)
            .IsUnique()
            .HasDatabaseName("IX_Professors_Email");

        // --- Relationships ---
        // A professor can have many groups, but each group belongs to one professor
        // When a professor is deleted, restrict deletion if they still have groups
        builder.HasMany(p => p.Groups)
            .WithOne(g => g.Professor)
            .HasForeignKey(g => g.ProfessorId)
            .OnDelete(DeleteBehavior.Restrict);

        // --- Table ---
        builder.ToTable("Professors");
    }
}