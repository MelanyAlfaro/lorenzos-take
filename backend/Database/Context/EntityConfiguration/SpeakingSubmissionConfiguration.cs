// Database/Configurations/SpeakingSubmissionConfiguration.cs
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Database.Configurations;

/// <summary>
/// Defines the database schema and constraints for the SpeakingSubmission entity.
/// Created when a student records and submits their audio for a quest's speaking section.
/// The professor later reviews it and optionally assigns bonus XP and written feedback.
/// </summary>
public class SpeakingSubmissionConfiguration : IEntityTypeConfiguration<SpeakingSubmission>
{
    public void Configure(EntityTypeBuilder<SpeakingSubmission> builder)
    {
        // --- Primary Key ---
        builder.HasKey(ss => ss.Id);

        // --- Properties ---
        builder.Property(ss => ss.QuestId)
            .IsRequired()
            .HasMaxLength(50)
            .HasComment("References the quest ID defined in the frontend JSON, e.g. 'quest-1'");

        builder.Property(ss => ss.AudioUrl)
            .IsRequired()
            .HasMaxLength(500)
            .HasComment("Permanent Cloudinary URL to the recorded audio file");

        builder.Property(ss => ss.OptionChosen)
            .IsRequired()
            .HasMaxLength(500)
            .HasComment("The sentence the student chose to record, e.g. option A, B or C from the quest JSON");

        // BonusXP is null until the professor reviews the submission
        builder.Property(ss => ss.BonusXP)
            .IsRequired(false)
            .HasComment("Extra XP assigned by the professor after reviewing. Null if not yet reviewed");

        // Feedback is null until the professor writes a comment
        builder.Property(ss => ss.ProfessorFeedback)
            .IsRequired(false)
            .HasMaxLength(1000)
            .HasComment("Optional written feedback from the professor. Null if not yet reviewed");

        builder.Property(ss => ss.SubmittedAt)
            .IsRequired()
            .HasDefaultValueSql("GETUTCDATE()")
            .HasComment("UTC timestamp of when the student submitted the recording");

        // ReviewedAt is null until the professor reviews the submission
        builder.Property(ss => ss.ReviewedAt)
            .IsRequired(false)
            .HasComment("UTC timestamp of when the professor reviewed the submission. Null if pending");

        // --- Indexes ---
        // Quickly find all pending submissions for a professor's students
        builder.HasIndex(ss => new { ss.StudentId, ss.QuestId })
            .HasDatabaseName("IX_SpeakingSubmissions_StudentId_QuestId");

        // Useful for filtering unreviewed submissions
        builder.HasIndex(ss => ss.ReviewedAt)
            .HasDatabaseName("IX_SpeakingSubmissions_ReviewedAt");

        // --- Relationships ---
        // Each submission belongs to one student
        //Restrict deletion of a student if they have speaking submissions, to preserve historical data
        builder.HasOne(ss => ss.Student)
            .WithMany(s => s.SpeakingSubmissions)
            .HasForeignKey(ss => ss.StudentId)
            .OnDelete(DeleteBehavior.Restrict);

        // --- Table ---
        builder.ToTable("SpeakingSubmissions");
    }
}