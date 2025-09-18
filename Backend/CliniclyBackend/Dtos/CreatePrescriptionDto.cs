namespace CliniclyBackend.Dtos
{
    public class CreatePrescriptionDto
    {
        public int AppointmentId { get; set; }
        public string Medication { get; set; } = string.Empty;
        public string Dosage { get; set; } = string.Empty;
    }
}
