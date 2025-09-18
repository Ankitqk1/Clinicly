using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CliniclyBackend.Models;

public partial class User
{
    public int UserId { get; set; }

    [Required]
    public string Name { get; set; } = null!;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = null!;

    public string? Phone { get; set; }

    [Required]
    public string PasswordHash { get; set; } = null!;

    public DateTime? DateOfBirth { get; set; }

    public string? Gender { get; set; }

    public string? Address { get; set; }

    public string? ProfileImage { get; set; }

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}
