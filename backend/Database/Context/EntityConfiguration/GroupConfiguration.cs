// Database/Configurations/GroupConfiguration.cs
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Database.Configurations;

/// <summary>
/// Defines the database schema and constraints for the Group entity.
/// Groups are classroom sections managed by a professor.
/// Each professor can have a maximum of 3 active groups (enforced at the service layer).
/// </summary>
public class GroupConfiguration : IEntityTypeConfiguration<Group>
{
    public void Configure(EntityTypeBuilder<Group> builder)
    {
        // --- Primary Key ---
        builder.HasKey(g => g.Id);

        // --- Properties ---
        builder.Property(g => g.Name)
            .IsRequired()
            .HasMaxLength(100)
            .HasComment("Display name of the group, e.g. '11th Grade A'");

        builder.Property(g => g.InvitationCode)
            .IsRequired()
            .HasMaxLength(10)
            .IsFixedLength()
            .HasComment("Short unique code shared with students to join the group");

        builder.Property(g => g.IsActive)
            .IsRequired()
            .HasDefaultValue(true)
            .HasComment("Inactive groups are hidden but their data is preserved");

        builder.Property(g => g.CreatedAt)
            .IsRequired()
            .HasDefaultValueSql("GETUTCDATE()")
            .HasComment("UTC timestamp of when the group was created");

        // --- Indexes ---
        // Invitation code must be unique — two groups cannot share the same code
        builder.HasIndex(g => g.InvitationCode)
            .IsUnique()
            .HasDatabaseName("IX_Groups_InvitationCode");

        // Useful for querying all active groups for a professor
        builder.HasIndex(g => new { g.ProfessorId, g.IsActive })
            .HasDatabaseName("IX_Groups_ProfessorId_IsActive");

        // --- Relationships ---
        // Each group belongs to one professor
        builder.HasOne(g => g.Professor)
            .WithMany(p => p.Groups)
            .HasForeignKey(g => g.ProfessorId)
            .OnDelete(DeleteBehavior.Restrict);

        // A group can have many students
        // When a group is deleted, restrict if students are still assigned
        builder.HasMany(g => g.Students)
            .WithOne(s => s.Group)
            .HasForeignKey(s => s.GroupId)
            .OnDelete(DeleteBehavior.Restrict);

        // --- Table ---
        builder.ToTable("Groups");
    }
}