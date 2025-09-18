using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CliniclyBackend.Models;

public partial class Appointment
{
    public int AppointmentId { get; set; }

    public int UserId { get; set; }

    public int DoctorId { get; set; }

    public DateTime AppointmentDateTime { get; set; }

    public string Status { get; set; } = "Scheduled"; // Scheduled, Completed, Cancelled

    public string? Reason { get; set; }

    public decimal? Amount { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public virtual Doctor Doctor { get; set; } = null!;

    public virtual ICollection<Prescription> Prescriptions { get; set; } = new List<Prescription>();

    public virtual User User { get; set; } = null!;
}
