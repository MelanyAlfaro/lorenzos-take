// Database/Configurations/StudentConfiguration.cs
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Database.Configurations;

/// <summary>
/// Defines the database schema and constraints for the Student entity.
/// Students complete quests, submit speaking recordings, and accumulate XP.
/// </summary>
public class StudentConfiguration : IEntityTypeConfiguration<Student>
{
    public void Configure(EntityTypeBuilder<Student> builder)
    {
        // --- Primary Key ---
        builder.HasKey(s => s.Id);

        // --- Properties ---
        builder.Property(s => s.Name)
            .IsRequired()
            .HasMaxLength(100)
            .HasComment("Full name of the student");

        builder.Property(s => s.Email)
            .IsRequired()
            .HasMaxLength(150)
            .HasComment("Used for login. Must be unique across all students");

        builder.Property(s => s.PasswordHash)
            .IsRequired()
            .HasMaxLength(255)
            .HasComment("Bcrypt hash of the password. Never store plain text passwords");

        builder.Property(s => s.TotalXP)
            .IsRequired()
            .HasDefaultValue(0)
            .HasComment("Accumulated experience points across all quests and submissions");

        // GroupId is nullable — a student may register before joining a group
        builder.Property(s => s.GroupId)
            .IsRequired(false)
            .HasComment("The group the student belongs to. Null if not yet assigned");

        // --- Indexes ---
        // Email must be unique across all students
        builder.HasIndex(s => s.Email)
            .IsUnique()
            .HasDatabaseName("IX_Students_Email");

        // Useful for loading all students in a group
        builder.HasIndex(s => s.GroupId)
            .HasDatabaseName("IX_Students_GroupId");

        // --- Relationships ---
        // Each student optionally belongs to one group
        builder.HasOne(s => s.Group)
            .WithMany(g => g.Students)
            .HasForeignKey(s => s.GroupId)
            .OnDelete(DeleteBehavior.Restrict);

        // A student can have many quest completions
        builder.HasMany(s => s.QuestCompletions)
            .WithOne(qc => qc.Student)
            .HasForeignKey(qc => qc.StudentId)
            .OnDelete(DeleteBehavior.Restrict);

        // A student can have many speaking submissions
        builder.HasMany(s => s.SpeakingSubmissions)
            .WithOne(ss => ss.Student)
            .HasForeignKey(ss => ss.StudentId)
            .OnDelete(DeleteBehavior.Restrict);

        // --- Table ---
        builder.ToTable("Students");
    }
}