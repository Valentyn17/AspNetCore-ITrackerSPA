using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ITrackerSPA.Models;
using ITrackerSPA.Models.Enums;

namespace ITrackerSPA.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ITrackerSPA.Models.Attachment", b =>
                {
                    b.Property<int>("AttachmentId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("CreatedAt");

                    b.Property<int?>("FileType");

                    b.Property<int?>("IssueId");

                    b.Property<string>("Name");

                    b.Property<string>("Path");

                    b.HasKey("AttachmentId");

                    b.HasIndex("IssueId");

                    b.ToTable("Attachment");
                });

            modelBuilder.Entity("ITrackerSPA.Models.Issue", b =>
                {
                    b.Property<int>("IssueId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("CreatedAt");

                    b.Property<string>("Creator");

                    b.Property<string>("Description");

                    b.Property<int>("IssueType");

                    b.Property<int>("Priority");

                    b.Property<int?>("ProjectId");

                    b.Property<int>("StatusType");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("IssueId");

                    b.HasIndex("ProjectId");

                    b.ToTable("Issue");
                });

            modelBuilder.Entity("ITrackerSPA.Models.Project", b =>
                {
                    b.Property<int>("ProjectId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("CreatedAt");

                    b.Property<string>("Description");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<string>("Url");

                    b.HasKey("ProjectId");

                    b.ToTable("Project");
                });

            modelBuilder.Entity("ITrackerSPA.Models.Attachment", b =>
                {
                    b.HasOne("ITrackerSPA.Models.Issue", "Issue")
                        .WithMany("Attachments")
                        .HasForeignKey("IssueId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ITrackerSPA.Models.Issue", b =>
                {
                    b.HasOne("ITrackerSPA.Models.Project", "Project")
                        .WithMany("Issues")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
