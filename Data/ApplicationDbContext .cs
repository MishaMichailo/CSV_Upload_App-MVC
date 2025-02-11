using CSV_Upload_App.Models;
using Microsoft.EntityFrameworkCore;

namespace CSV_Upload_App.Data
{
    public class ApplicationDbContext: DbContext 
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<PersonInformation> PersonInformations { get; set; }
    }
}
