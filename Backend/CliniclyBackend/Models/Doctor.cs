using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CliniclyBackend.Models;

public partial class Doctor
{
    public int DoctorId { get; set; }

    [Required]
    public string Name { get; set; } = null!;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    public string? Phone { get; set; }

    public string? PasswordHash { get; set; }

    public string? Specialization { get; set; }

    public string? Degree { get; set; }

    public string? Experience { get; set; }

    public string? About { get; set; }

    public decimal Fees { get; set; }

    public string? AddressLine1 { get; set; }

    public string? AddressLine2 { get; set; }

    public string? ImageUrl { get; set; }

    public bool IsAvailable { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}
