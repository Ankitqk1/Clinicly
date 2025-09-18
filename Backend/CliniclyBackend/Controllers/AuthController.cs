using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CliniclyBackend.Models;
using CliniclyBackend.DTOs;
using CliniclyBackend.Services;
using System.Security.Cryptography;
using System.Text;

namespace CliniclyBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DoctorAppContext _context;
        private readonly JwtTokenService _jwtTokenService;

        public AuthController(DoctorAppContext context, JwtTokenService jwtTokenService)
        {
            _context = context;
            _jwtTokenService = jwtTokenService;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<ActionResult<AuthResponseDto>> RegisterUser(RegisterDto dto)
        {
            // Check if user already exists
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            {
                return BadRequest("User with this email already exists");
            }

            // Hash password
            var passwordHash = HashPassword(dto.Password);

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = passwordHash,
                Phone = dto.Phone,
                DateOfBirth = dto.DateOfBirth,
                Gender = dto.Gender,
                Address = dto.Address,
                IsActive = true
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Generate JWT token
            var token = _jwtTokenService.GenerateToken(user.UserId, user.Name, user.Email, "Patient");

            var response = new AuthResponseDto
            {
                UserId = user.UserId,
                Name = user.Name,
                Email = user.Email,
                Phone = user.Phone,
                Token = token,
                UserType = "Patient"
            };

            return Ok(response);
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> LoginUser(LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            
            if (user == null || !VerifyPassword(dto.Password, user.PasswordHash))
            {
                return Unauthorized("Invalid email or password");
            }

            if (!user.IsActive)
            {
                return Unauthorized("Account is deactivated");
            }

            // Generate JWT token
            var token = _jwtTokenService.GenerateToken(user.UserId, user.Name, user.Email, "Patient");

            var response = new AuthResponseDto
            {
                UserId = user.UserId,
                Name = user.Name,
                Email = user.Email,
                Phone = user.Phone,
                Token = token,
                UserType = "Patient"
            };

            return Ok(response);
        }

        // POST: api/auth/doctor/register
        [HttpPost("doctor/register")]
        public async Task<ActionResult<AuthResponseDto>> RegisterDoctor(DoctorRegisterDto dto)
        {
            // Check if doctor already exists
            if (await _context.Doctors.AnyAsync(d => d.Email == dto.Email))
            {
                return BadRequest("Doctor with this email already exists");
            }

            // Hash password
            var passwordHash = HashPassword(dto.Password);

            var doctor = new Doctor
            {
                Name = dto.Name,
                Email = dto.Email,
                Phone = dto.Phone,
                PasswordHash = passwordHash,
                Specialization = dto.Specialization,
                Degree = dto.Degree,
                Experience = dto.Experience,
                About = dto.About,
                Fees = dto.Fees,
                AddressLine1 = dto.AddressLine1,
                AddressLine2 = dto.AddressLine2,
                IsAvailable = true
            };

            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            // Generate JWT token
            var token = _jwtTokenService.GenerateToken(doctor.DoctorId, doctor.Name, doctor.Email, "Doctor");

            var response = new AuthResponseDto
            {
                UserId = doctor.DoctorId,
                Name = doctor.Name,
                Email = doctor.Email,
                Phone = doctor.Phone,
                Token = token,
                UserType = "Doctor"
            };

            return Ok(response);
        }

        // POST: api/auth/doctor/login
        [HttpPost("doctor/login")]
        public async Task<ActionResult<AuthResponseDto>> LoginDoctor(LoginDto dto)
        {
            var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.Email == dto.Email);
            
            if (doctor == null || !VerifyPassword(dto.Password, doctor.PasswordHash ?? ""))
            {
                return Unauthorized("Invalid email or password");
            }

            if (!doctor.IsAvailable)
            {
                return Unauthorized("Doctor account is deactivated");
            }

            // Generate JWT token
            var token = _jwtTokenService.GenerateToken(doctor.DoctorId, doctor.Name, doctor.Email, "Doctor");

            var response = new AuthResponseDto
            {
                UserId = doctor.DoctorId,
                Name = doctor.Name,
                Email = doctor.Email,
                Phone = doctor.Phone,
                Token = token,
                UserType = "Doctor"
            };

            return Ok(response);
        }

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hashedBytes);
            }
        }

        private bool VerifyPassword(string password, string hash)
        {
            var newHash = HashPassword(password);
            return newHash == hash;
        }
    }
}
