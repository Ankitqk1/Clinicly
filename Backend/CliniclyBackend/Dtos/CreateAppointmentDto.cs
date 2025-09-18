namespace CliniclyBackend.Dtos
{
    public class CreateAppointmentDto
    {
        public int UserId { get; set; }
        public int DoctorId { get; set; }
        public DateTime AppointmentDateTime { get; set; }
    }
}

