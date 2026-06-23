// Database/Configurations/QuestCompletionConfiguration.cs
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Database.Configurations;

/// <summary>
/// Defines the database schema and constraints for the QuestCompletion entity.
/// A QuestCompletion record is created when a student fully completes a quest.
/// Quests themselves are defined in the frontend JSON — only the completion event is stored here.
/// </summary>
public class QuestCompletionConfiguration : IEntityTypeConfiguration<QuestCompletion>
{
    public void Configure(EntityTypeBuilder<QuestCompletion> builder)
    {
        // --- Primary Key ---
        builder.HasKey(qc => qc.Id);

        // --- Properties ---
        builder.Property(qc => qc.QuestId)
            .IsRequired()
            .HasMaxLength(50)
            .HasComment("References the quest ID defined in the frontend JSON, e.g. 'quest-1'");

        builder.Property(qc => qc.XpEarned)
            .IsRequired()
            .HasDefaultValue(0)
            .HasComment("Total XP awarded to the student for completing this quest");

        builder.Property(qc => qc.CompletedAt)
            .IsRequired()
            .HasDefaultValueSql("GETUTCDATE()")
            .HasComment("UTC timestamp of when the student completed the quest");

        // --- Indexes ---
        // Prevents a student from having duplicate completions for the same quest
        builder.HasIndex(qc => new { qc.StudentId, qc.QuestId })
            .IsUnique()
            .HasDatabaseName("IX_QuestCompletions_StudentId_QuestId");

        // --- Relationships ---
        // Each completion belongs to one student
        // Restrict deletion of a student if they have quest completions, to preserve historical data
        builder.HasOne(qc => qc.Student)
            .WithMany(s => s.QuestCompletions)
            .HasForeignKey(qc => qc.StudentId)
            .OnDelete(DeleteBehavior.Restrict);

        // --- Table ---
        builder.ToTable("QuestCompletions");
    }
}