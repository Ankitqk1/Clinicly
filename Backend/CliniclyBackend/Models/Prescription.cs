using System;
using System.Collections.Generic;

namespace CliniclyBackend.Models;

public partial class Prescription
{
    internal string Medication;
    internal string Dosage;

    public int PrescriptionId { get; set; }

    public int AppointmentId { get; set; }

    public string PrescriptionText { get; set; } = null!;

    public virtual Appointment Appointment { get; set; } = null!;
}
