using CliniclyBackend.Dtos;
using CliniclyBackend.DTOs;
using CliniclyBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CliniclyBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrescriptionsController : ControllerBase
    {
        private readonly DoctorAppContext _context;

        public PrescriptionsController(DoctorAppContext context)
        {
            _context = context;
        }

        // ✅ GET: api/prescriptions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PrescriptionDTO>>> GetPrescriptions()
        {
            var prescriptions = await _context.Prescriptions
                .Include(p => p.Appointment)
                .ThenInclude(a => a.Doctor)
                .Include(p => p.Appointment.User)
                .Select(p => new PrescriptionDTO
                {
                    PrescriptionId = p.PrescriptionId,
                    Medication = p.Medication,
                    Dosage = p.Dosage,
                    AppointmentId = p.AppointmentId,
                    DoctorName = p.Appointment.Doctor.Name,
                    PatientName = p.Appointment.User.Name
                })
                .ToListAsync();

            return Ok(prescriptions);
        }

        // ✅ GET: api/prescriptions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PrescriptionDTO>> GetPrescription(int id)
        {
            var prescription = await _context.Prescriptions
                .Include(p => p.Appointment)
                .ThenInclude(a => a.Doctor)
                .Include(p => p.Appointment.User)
                .Where(p => p.PrescriptionId == id)
                .Select(p => new PrescriptionDTO
                {
                    PrescriptionId = p.PrescriptionId,
                    Medication = p.Medication,
                    Dosage = p.Dosage,
                    AppointmentId = p.AppointmentId,
                    DoctorName = p.Appointment.Doctor.Name,
                    PatientName = p.Appointment.User.Name
                })
                .FirstOrDefaultAsync();

            if (prescription == null)
            {
                return NotFound();
            }

            return Ok(prescription);
        }
        // ✅ GET: api/prescriptions/patient/5
        [HttpGet("patient/{patientId}")]
        public async Task<ActionResult<IEnumerable<PrescriptionDTO>>> GetPrescriptionsByPatient(int patientId)
        {
            var prescriptions = await _context.Prescriptions
                .Include(p => p.Appointment)
                .ThenInclude(a => a.Doctor)
                .Include(p => p.Appointment.User)
                .Where(p => p.Appointment.UserId == patientId) // filter by patient
                .Select(p => new PrescriptionDTO
                {
                    PrescriptionId = p.PrescriptionId,
                    Medication = p.Medication,
                    Dosage = p.Dosage,
                    AppointmentId = p.AppointmentId,
                    DoctorName = p.Appointment.Doctor.Name,
                    PatientName = p.Appointment.User.Name
                })
                .ToListAsync();

            if (!prescriptions.Any())
            {
                return NotFound("No prescriptions found for this patient.");
            }

            return Ok(prescriptions);
        }


        // ✅ POST: api/prescriptions
        [HttpPost]
        public async Task<ActionResult<PrescriptionDTO>> PostPrescription(CreatePrescriptionDto dto)
        {
            var appointment = await _context.Appointments
                .Include(a => a.Doctor)
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.AppointmentId == dto.AppointmentId);

            if (appointment == null)
            {
                return BadRequest("Invalid AppointmentId");
            }

            var prescription = new Prescription
            {
                AppointmentId = dto.AppointmentId,
                Medication = dto.Medication,
                Dosage = dto.Dosage
            };

            _context.Prescriptions.Add(prescription);
            await _context.SaveChangesAsync();

            var prescriptionDto = new PrescriptionDTO
            {
                PrescriptionId = prescription.PrescriptionId,
                Medication = prescription.Medication,
                Dosage = prescription.Dosage,
                AppointmentId = prescription.AppointmentId,
                DoctorName = appointment.Doctor.Name,
                PatientName = appointment.User.Name
            };

            return CreatedAtAction(nameof(GetPrescription), new { id = prescription.PrescriptionId }, prescriptionDto);
        }

        // ✅ PUT: api/prescriptions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPrescription(int id, CreatePrescriptionDto dto)
        {
            var prescription = await _context.Prescriptions.FindAsync(id);
            if (prescription == null) return NotFound();

            prescription.Medication = dto.Medication;
            prescription.Dosage = dto.Dosage;
            prescription.AppointmentId = dto.AppointmentId;

            _context.Entry(prescription).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // ✅ DELETE: api/prescriptions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrescription(int id)
        {
            var prescription = await _context.Prescriptions.FindAsync(id);
            if (prescription == null) return NotFound();

            _context.Prescriptions.Remove(prescription);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
