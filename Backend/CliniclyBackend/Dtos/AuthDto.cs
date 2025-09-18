using System.ComponentModel.DataAnnotations;

namespace CliniclyBackend.DTOs
{
    public class LoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }

    public class RegisterDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;

        public string? Phone { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? Address { get; set; }
    }

    public class DoctorRegisterDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;

        public string? Phone { get; set; }

        [Required]
        public string Specialization { get; set; } = string.Empty;

        public string? Degree { get; set; }
        public string? Experience { get; set; }
        public string? About { get; set; }
        public decimal Fees { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
    }

    public class AuthResponseDto
    {
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string Token { get; set; } = string.Empty; // For future JWT implementation
        public string UserType { get; set; } = "Patient"; // Patient or Doctor
    }
}
