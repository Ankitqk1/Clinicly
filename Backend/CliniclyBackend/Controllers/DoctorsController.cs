using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CliniclyBackend.Models;

namespace CliniclyBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly DoctorAppContext _context;

        public DoctorsController(DoctorAppContext context)
        {
            _context = context;
        }

        // GET: api/doctors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetDoctors([FromQuery] string? speciality = null)
        {
            var query = _context.Doctors.Where(d => d.IsAvailable);
            
            if (!string.IsNullOrEmpty(speciality))
            {
                query = query.Where(d => d.Specialization == speciality);
            }

            var doctors = await query.Select(d => new
            {
                _id = "doc" + d.DoctorId,
                name = d.Name,
                email = d.Email,
                phone = d.Phone,
                speciality = d.Specialization,
                degree = d.Degree,
                experience = d.Experience,
                about = d.About,
                fees = d.Fees,
                address = new
                {
                    line1 = d.AddressLine1,
                    line2 = d.AddressLine2
                },
                image = d.ImageUrl,
                isAvailable = d.IsAvailable
            }).ToListAsync();

            return Ok(doctors);
        }

        // GET: api/doctors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetDoctor(string id)
        {
            Doctor? doctor = null;
            
            // Handle both numeric ID and frontend format (doc1, doc2, etc.)
            if (id.StartsWith("doc") && int.TryParse(id.Substring(3), out int docId))
            {
                doctor = await _context.Doctors.FindAsync(docId);
            }
            else if (int.TryParse(id, out int numericId))
            {
                doctor = await _context.Doctors.FindAsync(numericId);
            }

            if (doctor == null)
            {
                return NotFound();
            }

            var result = new
            {
                _id = "doc" + doctor.DoctorId,
                name = doctor.Name,
                email = doctor.Email,
                phone = doctor.Phone,
                speciality = doctor.Specialization,
                degree = doctor.Degree,
                experience = doctor.Experience,
                about = doctor.About,
                fees = doctor.Fees,
                address = new
                {
                    line1 = doctor.AddressLine1,
                    line2 = doctor.AddressLine2
                },
                image = doctor.ImageUrl,
                isAvailable = doctor.IsAvailable
            };

            return Ok(result);
        }

        // POST: api/doctors
        [HttpPost]
        public async Task<ActionResult<Doctor>> PostDoctor(Doctor doctor)
        {
            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDoctor), new { id = doctor.DoctorId }, doctor);
        }

        // PUT: api/doctors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDoctor(int id, Doctor doctor)
        {
            if (id != doctor.DoctorId)
            {
                return BadRequest();
            }

            _context.Entry(doctor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Doctors.Any(e => e.DoctorId == id))
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

        // DELETE: api/doctors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
