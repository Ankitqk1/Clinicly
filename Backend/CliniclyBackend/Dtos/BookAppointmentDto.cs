using System.ComponentModel.DataAnnotations;

namespace CliniclyBackend.DTOs
{
    public class BookAppointmentDto
    {
        [Required]
        public int UserId { get; set; }

        [Required]
        public string DoctorId { get; set; } = string.Empty; // Accept doc1, doc2 format

        [Required]
        public DateTime AppointmentDateTime { get; set; }

        public string? Reason { get; set; }
    }

    public class AppointmentResponseDto
    {
        public int AppointmentId { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string? UserEmail { get; set; }
        public string? UserPhone { get; set; }
        public string DoctorId { get; set; } = string.Empty;
        public string DoctorName { get; set; } = string.Empty;
        public DateTime AppointmentDateTime { get; set; }
        public string Status { get; set; } = string.Empty;
        public string? Reason { get; set; }
        public decimal? Amount { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
