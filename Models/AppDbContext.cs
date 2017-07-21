using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ITrackerSPA.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {

        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<Issue> Issues { get; set; }
        public DbSet<Attachment> Attachments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Project>()
                        .HasMany(i => i.Issues)
                        .WithOne(b => b.Project)
                        .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Issue>()
                        .HasMany(i => i.Attachments)
                        .WithOne(a => a.Issue)
                        .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Project>().ToTable("Project");
            modelBuilder.Entity<Issue>().ToTable("Issue");
            modelBuilder.Entity<Attachment>().ToTable("Attachment");
        }

    }
}
