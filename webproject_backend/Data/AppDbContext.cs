using Microsoft.EntityFrameworkCore;
using webproject_backend.Models;

namespace webproject_backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<AppUser> Users { get; set; }
    }
}