using CliniclyBackend.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace CliniclyBackend.Services
{
    public class DatabaseSeeder
    {
        private readonly DoctorAppContext _context;

        public DatabaseSeeder(DoctorAppContext context)
        {
            _context = context;
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        public async Task SeedDoctorsAsync()
        {
            // Check if doctors already exist
            if (await _context.Doctors.AnyAsync())
            {
                return; // Database has been seeded
            }

            // Default password for all seeded doctors (for testing only)
            var defaultPasswordHash = HashPassword("password123");

            var doctors = new List<Doctor>
            {
                new Doctor
                {
                    Name = "Dr. Richard James",
                    Email = "richard.james@clinic.com",
                    Phone = "+1234567890",
                    PasswordHash = defaultPasswordHash,
                    Specialization = "General physician",
                    Degree = "MBBS",
                    Experience = "4 Years",
                    About = "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
                    Fees = 50,
                    AddressLine1 = "17th Cross, Richmond",
                    AddressLine2 = "Circle, Ring Road, London",
                    ImageUrl = "/images/doc1.png",
                    IsAvailable = true
                },
                new Doctor
                {
                    Name = "Dr. Emily Larson",
                    Email = "emily.larson@clinic.com",
                    Phone = "+1234567891",
                    PasswordHash = defaultPasswordHash,
                    Specialization = "Gynecologist",
                    Degree = "MBBS",
                    Experience = "3 Years",
                    About = "Dr. Emily specializes in women's health and reproductive medicine with a focus on patient comfort and comprehensive care.",
                    Fees = 60,
                    AddressLine1 = "27th Cross, Richmond",
                    AddressLine2 = "Circle, Ring Road, London",
                    ImageUrl = "/images/doc2.png",
                    IsAvailable = true
                },
                new Doctor
                {
                    Name = "Dr. Sarah Patel",
                    Email = "sarah.patel@clinic.com",
                    Phone = "+1234567892",
                    PasswordHash = defaultPasswordHash,
                    Specialization = "Dermatologist",
                    Degree = "MBBS",
                    Experience = "1 Years",
                    About = "Dr. Sarah specializes in skin conditions and cosmetic dermatology with modern treatment approaches.",
                    Fees = 30,
                    AddressLine1 = "37th Cross, Richmond",
                    AddressLine2 = "Circle, Ring Road, London",
                    ImageUrl = "/images/doc3.png",
                    IsAvailable = true
                },
                new Doctor
                {
                    Name = "Dr. Christopher Lee",
                    Email = "christopher.lee@clinic.com",
                    Phone = "+1234567893",
                    PasswordHash = defaultPasswordHash,
                    Specialization = "Pediatricians",
                    Degree = "MBBS",
                    Experience = "2 Years",
                    About = "Dr. Christopher provides compassionate care for children and adolescents with expertise in child development.",
                    Fees = 40,
                    AddressLine1 = "47th Cross, Richmond",
                    AddressLine2 = "Circle, Ring Road, London",
                    ImageUrl = "/images/doc4.png",
                    IsAvailable = true
                },
                new Doctor
                {
                    Name = "Dr. Jennifer Garcia",
                    Email = "jennifer.garcia@clinic.com",
                    Phone = "+1234567894",
                    PasswordHash = defaultPasswordHash,
                    Specialization = "Neurologist",
                    Degree = "MBBS",
                    Experience = "4 Years",
                    About = "Dr. Jennifer specializes in neurological disorders and brain health with advanced diagnostic techniques.",
                    Fees = 50,
                    AddressLine1 = "57th Cross, Richmond",
                    AddressLine2 = "Circle, Ring Road, London",
                    ImageUrl = "/images/doc5.png",
                    IsAvailable = true
                },
                new Doctor
                {
                    Name = "Dr. Andrew Williams",
                    Email = "andrew.williams@clinic.com",
                    Phone = "+1234567895",
                    PasswordHash = defaultPasswordHash,
                    Specialization = "Neurologist",
                    Degree = "MBBS",
                    Experience = "4 Years",
                    About = "Dr. Andrew focuses on complex neurological conditions and provides comprehensive neurological care.",
                    Fees = 50,
                    AddressLine1 = "57th Cross, Richmond",
                    AddressLine2 = "Circle, Ring Road, London",
                    ImageUrl = "/images/doc6.png",
                    IsAvailable = true
                },
                new Doctor
                {
                    Name = "Dr. Timothy White",
                    Email = "timothy.white@clinic.com",
                    Phone = "+1234567897",
                    PasswordHash = defaultPasswordHash,
                    Specialization = "Gynecologist",
                    Degree = "MBBS",
                    Experience = "3 Years",
                    About = "Dr. Timothy provides expert gynecological care with emphasis on patient education and preventive care.",
                    Fees = 60,
                    AddressLine1 = "27th Cross, Richmond",
                    AddressLine2 = "Circle, Ring Road, London",
                    ImageUrl = "/images/doc8.png",
                    IsAvailable = true
                },
                new Doctor
                {
                    Name = "Dr. Ava Mitchell",
                    Email = "ava.mitchell@clinic.com",
                    Phone = "+1234567898",
                    PasswordHash = defaultPasswordHash,
                    Specialization = "Dermatologist",
                    Degree = "MBBS",
                    Experience = "1 Years",
                    About = "Dr. Ava specializes in both medical and cosmetic dermatology with the latest treatment techniques.",
                    Fees = 30,
                    AddressLine1 = "37th Cross, Richmond",
                    AddressLine2 = "Circle, Ring Road, London",
                    ImageUrl = "/images/doc9.png",
                    IsAvailable = true
                }
            };

            await _context.Doctors.AddRangeAsync(doctors);
            await _context.SaveChangesAsync();
        }
    }
}
