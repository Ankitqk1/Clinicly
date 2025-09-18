using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using CliniclyBackend.Models;
using CliniclyBackend.DTOs;

namespace CliniclyBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly DoctorAppContext _context;

        public AppointmentsController(DoctorAppContext context)
        {
            _context = context;
        }

        // GET: api/appointments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
        {
            return await _context.Appointments
                .Include(a => a.Doctor)   // eager load doctor
                .Include(a => a.User)     // eager load user
                .ToListAsync();
        }

        // GET: api/appointments/doctor/5
        [HttpGet("doctor/{doctorId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<AppointmentResponseDto>>> GetDoctorAppointments(int doctorId)
        {
            var appointments = await _context.Appointments
                .Include(a => a.Doctor)
                .Include(a => a.User)
                .Where(a => a.DoctorId == doctorId)
                .OrderByDescending(a => a.AppointmentDateTime)
                .Select(a => new AppointmentResponseDto
                {
                    AppointmentId = a.AppointmentId,
                    UserId = a.UserId,
                    UserName = a.User.Name,
                    UserEmail = a.User.Email,
                    UserPhone = a.User.Phone,
                    DoctorId = "doc" + a.DoctorId,
                    DoctorName = a.Doctor.Name,
                    AppointmentDateTime = a.AppointmentDateTime,
                    Status = a.Status,
                    Reason = a.Reason,
                    Amount = a.Amount,
                    CreatedAt = a.CreatedAt
                })
                .ToListAsync();

            return Ok(appointments);
        }

        // GET: api/appointments/user/5
        [HttpGet("user/{userId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<AppointmentResponseDto>>> GetUserAppointments(int userId)
        {
            var appointments = await _context.Appointments
                .Include(a => a.Doctor)
                .Include(a => a.User)
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.AppointmentDateTime)
                .Select(a => new AppointmentResponseDto
                {
                    AppointmentId = a.AppointmentId,
                    UserId = a.UserId,
                    UserName = a.User.Name,
                    UserEmail = a.User.Email,
                    UserPhone = a.User.Phone,
                    DoctorId = "doc" + a.DoctorId,
                    DoctorName = a.Doctor.Name,
                    AppointmentDateTime = a.AppointmentDateTime,
                    Status = a.Status,
                    Reason = a.Reason,
                    Amount = a.Amount,
                    CreatedAt = a.CreatedAt
                })
                .ToListAsync();

            return Ok(appointments);
        }

        // GET: api/appointments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(int id)
        {
            var appointment = await _context.Appointments
                .Include(a => a.Doctor)
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.AppointmentId == id);

            if (appointment == null)
            {
                return NotFound();
            }

            return appointment;
        }

        // POST: api/appointments
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<AppointmentResponseDto>> PostAppointment(BookAppointmentDto dto)
        {
            // Parse doctor ID from frontend format (doc1 -> 1)
            int doctorId;
            if (dto.DoctorId.StartsWith("doc") && int.TryParse(dto.DoctorId.Substring(3), out doctorId))
            {
                // Valid format
            }
            else if (!int.TryParse(dto.DoctorId, out doctorId))
            {
                return BadRequest("Invalid doctor ID format");
            }

            // Verify doctor exists
            var doctor = await _context.Doctors.FindAsync(doctorId);
            if (doctor == null)
            {
                return NotFound("Doctor not found");
            }

            // Verify user exists
            var user = await _context.Users.FindAsync(dto.UserId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            // Check if slot is available (no existing appointment at same time)
            var existingAppointment = await _context.Appointments
                .FirstOrDefaultAsync(a => a.DoctorId == doctorId && 
                                         a.AppointmentDateTime == dto.AppointmentDateTime &&
                                         a.Status != "Cancelled");
            
            if (existingAppointment != null)
            {
                return BadRequest("This time slot is already booked");
            }

            var appointment = new Appointment
            {
                UserId = dto.UserId,
                DoctorId = doctorId,
                AppointmentDateTime = dto.AppointmentDateTime,
                Reason = dto.Reason,
                Amount = doctor.Fees,
                Status = "Scheduled"
            };

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            var response = new AppointmentResponseDto
            {
                AppointmentId = appointment.AppointmentId,
                UserId = appointment.UserId,
                UserName = user.Name,
                DoctorId = "doc" + appointment.DoctorId,
                DoctorName = doctor.Name,
                AppointmentDateTime = appointment.AppointmentDateTime,
                Status = appointment.Status,
                Reason = appointment.Reason,
                Amount = appointment.Amount,
                CreatedAt = appointment.CreatedAt
            };

            return CreatedAtAction("GetAppointment", new { id = appointment.AppointmentId }, response);
        }

        // PUT: api/appointments/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutAppointment(int id, Appointment appointment)
        {
            if (id != appointment.AppointmentId)
            {
                return BadRequest();
            }

            _context.Entry(appointment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Appointments.Any(e => e.AppointmentId == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/appointments/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null)
            {
                return NotFound();
            }

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

