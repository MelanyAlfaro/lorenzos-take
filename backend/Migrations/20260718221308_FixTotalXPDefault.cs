using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class FixTotalXPDefault : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Groups_Professors_ProfessorId",
                table: "Groups");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestCompletions_Students_StudentId",
                table: "QuestCompletions");

            migrationBuilder.DropForeignKey(
                name: "FK_SpeakingSubmissions_Students_StudentId",
                table: "SpeakingSubmissions");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Groups_GroupId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_SpeakingSubmissions_StudentId",
                table: "SpeakingSubmissions");

            migrationBuilder.DropIndex(
                name: "IX_QuestCompletions_StudentId",
                table: "QuestCompletions");

            migrationBuilder.DropIndex(
                name: "IX_Groups_ProfessorId",
                table: "Groups");

            migrationBuilder.AlterColumn<int>(
                name: "TotalXP",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0,
                comment: "Accumulated experience points across all quests and submissions",
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "Students",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                comment: "Bcrypt hash of the password. Never store plain text passwords",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Students",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                comment: "Full name of the student",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "GroupId",
                table: "Students",
                type: "int",
                nullable: true,
                comment: "The group the student belongs to. Null if not yet assigned",
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Students",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                comment: "Used for login. Must be unique across all students",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "SubmittedAt",
                table: "SpeakingSubmissions",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETUTCDATE()",
                comment: "UTC timestamp of when the student submitted the recording",
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ReviewedAt",
                table: "SpeakingSubmissions",
                type: "datetime2",
                nullable: true,
                comment: "UTC timestamp of when the professor reviewed the submission. Null if pending",
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "QuestId",
                table: "SpeakingSubmissions",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                comment: "References the quest ID defined in the frontend JSON, e.g. 'quest-1'",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "ProfessorFeedback",
                table: "SpeakingSubmissions",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true,
                comment: "Optional written feedback from the professor. Null if not yet reviewed",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "OptionChosen",
                table: "SpeakingSubmissions",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                comment: "The sentence the student chose to record, e.g. option A, B or C from the quest JSON",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "BonusXP",
                table: "SpeakingSubmissions",
                type: "int",
                nullable: true,
                comment: "Extra XP assigned by the professor after reviewing. Null if not yet reviewed",
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AudioUrl",
                table: "SpeakingSubmissions",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                comment: "Permanent Cloudinary URL to the recorded audio file",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "XpEarned",
                table: "QuestCompletions",
                type: "int",
                nullable: false,
                defaultValue: 0,
                comment: "Total XP awarded to the student for completing this quest",
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "QuestId",
                table: "QuestCompletions",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                comment: "References the quest ID defined in the frontend JSON, e.g. 'quest-1'",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CompletedAt",
                table: "QuestCompletions",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETUTCDATE()",
                comment: "UTC timestamp of when the student completed the quest",
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "Professors",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                comment: "Bcrypt hash of the password. Never store plain text passwords",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Professors",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                comment: "Full name of the professor",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Professors",
                type: "nvarchar(150)",
                maxLength: 150,
                nullable: false,
                comment: "Used for login. Must be unique across all professors",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Groups",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                comment: "Display name of the group, e.g. '11th Grade A'",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<bool>(
                name: "IsActive",
                table: "Groups",
                type: "bit",
                nullable: false,
                defaultValue: true,
                comment: "Inactive groups are hidden but their data is preserved",
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<string>(
                name: "InvitationCode",
                table: "Groups",
                type: "nchar(10)",
                fixedLength: true,
                maxLength: 10,
                nullable: false,
                comment: "Short unique code shared with students to join the group",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Groups",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETUTCDATE()",
                comment: "UTC timestamp of when the group was created",
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.CreateIndex(
                name: "IX_Students_Email",
                table: "Students",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_SpeakingSubmissions_ReviewedAt",
                table: "SpeakingSubmissions",
                column: "ReviewedAt");

            migrationBuilder.CreateIndex(
                name: "IX_SpeakingSubmissions_StudentId_QuestId",
                table: "SpeakingSubmissions",
                columns: new[] { "StudentId", "QuestId" });

            migrationBuilder.CreateIndex(
                name: "IX_QuestCompletions_StudentId_QuestId",
                table: "QuestCompletions",
                columns: new[] { "StudentId", "QuestId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Professors_Email",
                table: "Professors",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Groups_InvitationCode",
                table: "Groups",
                column: "InvitationCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Groups_ProfessorId_IsActive",
                table: "Groups",
                columns: new[] { "ProfessorId", "IsActive" });

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_Professors_ProfessorId",
                table: "Groups",
                column: "ProfessorId",
                principalTable: "Professors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestCompletions_Students_StudentId",
                table: "QuestCompletions",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SpeakingSubmissions_Students_StudentId",
                table: "SpeakingSubmissions",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Groups_GroupId",
                table: "Students",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Groups_Professors_ProfessorId",
                table: "Groups");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestCompletions_Students_StudentId",
                table: "QuestCompletions");

            migrationBuilder.DropForeignKey(
                name: "FK_SpeakingSubmissions_Students_StudentId",
                table: "SpeakingSubmissions");

            migrationBuilder.DropForeignKey(
                name: "FK_Students_Groups_GroupId",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Students_Email",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_SpeakingSubmissions_ReviewedAt",
                table: "SpeakingSubmissions");

            migrationBuilder.DropIndex(
                name: "IX_SpeakingSubmissions_StudentId_QuestId",
                table: "SpeakingSubmissions");

            migrationBuilder.DropIndex(
                name: "IX_QuestCompletions_StudentId_QuestId",
                table: "QuestCompletions");

            migrationBuilder.DropIndex(
                name: "IX_Professors_Email",
                table: "Professors");

            migrationBuilder.DropIndex(
                name: "IX_Groups_InvitationCode",
                table: "Groups");

            migrationBuilder.DropIndex(
                name: "IX_Groups_ProfessorId_IsActive",
                table: "Groups");

            migrationBuilder.AlterColumn<int>(
                name: "TotalXP",
                table: "Students",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValue: 0,
                oldComment: "Accumulated experience points across all quests and submissions");

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "Students",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255,
                oldComment: "Bcrypt hash of the password. Never store plain text passwords");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Students",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldComment: "Full name of the student");

            migrationBuilder.AlterColumn<int>(
                name: "GroupId",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true,
                oldComment: "The group the student belongs to. Null if not yet assigned");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Students",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(150)",
                oldMaxLength: 150,
                oldComment: "Used for login. Must be unique across all students");

            migrationBuilder.AlterColumn<DateTime>(
                name: "SubmittedAt",
                table: "SpeakingSubmissions",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValueSql: "GETUTCDATE()",
                oldComment: "UTC timestamp of when the student submitted the recording");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ReviewedAt",
                table: "SpeakingSubmissions",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true,
                oldComment: "UTC timestamp of when the professor reviewed the submission. Null if pending");

            migrationBuilder.AlterColumn<string>(
                name: "QuestId",
                table: "SpeakingSubmissions",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldComment: "References the quest ID defined in the frontend JSON, e.g. 'quest-1'");

            migrationBuilder.AlterColumn<string>(
                name: "ProfessorFeedback",
                table: "SpeakingSubmissions",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(1000)",
                oldMaxLength: 1000,
                oldNullable: true,
                oldComment: "Optional written feedback from the professor. Null if not yet reviewed");

            migrationBuilder.AlterColumn<string>(
                name: "OptionChosen",
                table: "SpeakingSubmissions",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500,
                oldComment: "The sentence the student chose to record, e.g. option A, B or C from the quest JSON");

            migrationBuilder.AlterColumn<int>(
                name: "BonusXP",
                table: "SpeakingSubmissions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true,
                oldComment: "Extra XP assigned by the professor after reviewing. Null if not yet reviewed");

            migrationBuilder.AlterColumn<string>(
                name: "AudioUrl",
                table: "SpeakingSubmissions",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(500)",
                oldMaxLength: 500,
                oldComment: "Permanent Cloudinary URL to the recorded audio file");

            migrationBuilder.AlterColumn<int>(
                name: "XpEarned",
                table: "QuestCompletions",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldDefaultValue: 0,
                oldComment: "Total XP awarded to the student for completing this quest");

            migrationBuilder.AlterColumn<string>(
                name: "QuestId",
                table: "QuestCompletions",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50,
                oldComment: "References the quest ID defined in the frontend JSON, e.g. 'quest-1'");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CompletedAt",
                table: "QuestCompletions",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValueSql: "GETUTCDATE()",
                oldComment: "UTC timestamp of when the student completed the quest");

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "Professors",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(255)",
                oldMaxLength: 255,
                oldComment: "Bcrypt hash of the password. Never store plain text passwords");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Professors",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldComment: "Full name of the professor");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Professors",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(150)",
                oldMaxLength: 150,
                oldComment: "Used for login. Must be unique across all professors");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Groups",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100,
                oldComment: "Display name of the group, e.g. '11th Grade A'");

            migrationBuilder.AlterColumn<bool>(
                name: "IsActive",
                table: "Groups",
                type: "bit",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldDefaultValue: true,
                oldComment: "Inactive groups are hidden but their data is preserved");

            migrationBuilder.AlterColumn<string>(
                name: "InvitationCode",
                table: "Groups",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nchar(10)",
                oldFixedLength: true,
                oldMaxLength: 10,
                oldComment: "Short unique code shared with students to join the group");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                table: "Groups",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValueSql: "GETUTCDATE()",
                oldComment: "UTC timestamp of when the group was created");

            migrationBuilder.CreateIndex(
                name: "IX_SpeakingSubmissions_StudentId",
                table: "SpeakingSubmissions",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestCompletions_StudentId",
                table: "QuestCompletions",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_Groups_ProfessorId",
                table: "Groups",
                column: "ProfessorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Groups_Professors_ProfessorId",
                table: "Groups",
                column: "ProfessorId",
                principalTable: "Professors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestCompletions_Students_StudentId",
                table: "QuestCompletions",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SpeakingSubmissions_Students_StudentId",
                table: "SpeakingSubmissions",
                column: "StudentId",
                principalTable: "Students",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Groups_GroupId",
                table: "Students",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
