namespace CliniclyBackend.DTOs
{
    public class PrescriptionDTO
    {
        public int PrescriptionId { get; set; }
        public string Medication { get; set; } = string.Empty;
        public string Dosage { get; set; } = string.Empty;
        public int AppointmentId { get; set; }
        public string DoctorName { get; set; } = string.Empty;
        public string PatientName { get; set; } = string.Empty;
    }
}
