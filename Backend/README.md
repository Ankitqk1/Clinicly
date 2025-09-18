# Doctor Appointment API Backend

## Overview
This ASP.NET Core Web API provides backend services for the Clinicly doctor appointment web application. It includes full CRUD operations for doctors, patients, and appointments with proper database integration.

## Database
- **Database**: SQL Server LocalDB
- **Connection String**: `Server=(localdb)\\MSSQLLocalDB;Database=DoctorAppDb;Trusted_Connection=True;TrustServerCertificate=True`
- **ORM**: Entity Framework Core 9.0.8

## Project Structure
```
CliniclyBackend/
├── Controllers/
│   ├── AuthController.cs          # Authentication endpoints
│   ├── AppointmentsController.cs  # Appointment management
│   ├── DoctorsController.cs       # Doctor management
│   ├── UsersController.cs         # User management
│   └── PrescriptionsController.cs # Prescription management
├── Models/
│   ├── Doctor.cs                  # Doctor entity
│   ├── User.cs                    # User/Patient entity
│   ├── Appointment.cs             # Appointment entity
│   ├── Prescription.cs            # Prescription entity
│   └── DoctorAppContext.cs        # Database context
├── DTOs/
│   ├── AuthDto.cs                 # Authentication DTOs
│   └── BookAppointmentDto.cs      # Appointment booking DTOs
└── Services/
    └── DatabaseSeeder.cs          # Initial data seeding
```

## API Endpoints

### Doctors
- **GET** `/api/doctors` - Get all available doctors
- **GET** `/api/doctors?speciality=Gynecologist` - Get doctors by speciality
- **GET** `/api/doctors/{id}` - Get specific doctor (supports both `doc1` and `1` formats)
- **POST** `/api/doctors` - Create new doctor
- **PUT** `/api/doctors/{id}` - Update doctor
- **DELETE** `/api/doctors/{id}` - Delete doctor

### Authentication
- **POST** `/api/auth/register` - Register new patient
- **POST** `/api/auth/login` - Patient login
- **POST** `/api/auth/doctor/register` - Register new doctor
- **POST** `/api/auth/doctor/login` - Doctor login

### Appointments
- **GET** `/api/appointments` - Get all appointments
- **GET** `/api/appointments/user/{userId}` - Get appointments for specific user
- **GET** `/api/appointments/{id}` - Get specific appointment
- **POST** `/api/appointments` - Book new appointment
- **PUT** `/api/appointments/{id}` - Update appointment
- **DELETE** `/api/appointments/{id}` - Cancel appointment

## Specialities Supported
- General physician
- Gynecologist
- Dermatologist
- Pediatricians
- Neurologist
- Gastroenterologist

## Frontend Integration
The API is configured with CORS to allow requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (React dev server)

## Running the Application
1. Navigate to the backend directory:
   ```bash
   cd Backend/CliniclyBackend
   ```

2. Restore packages and run:
   ```bash
   dotnet restore
   dotnet run
   ```

3. API will be available at: `http://localhost:5030`
4. Swagger documentation: `http://localhost:5030/swagger`

## Database Commands
- **Create Migration**: `dotnet ef migrations add MigrationName`
- **Update Database**: `dotnet ef database update`
- **Drop Database**: `dotnet ef database drop`

## Example API Calls

### Get all doctors
```bash
curl http://localhost:5030/api/doctors
```

### Get gynecologists
```bash
curl "http://localhost:5030/api/doctors?speciality=Gynecologist"
```

### Get specific doctor
```bash
curl http://localhost:5030/api/doctors/doc1
```

### Register new patient
```bash
curl -X POST http://localhost:5030/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

### Book appointment
```bash
curl -X POST http://localhost:5030/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "doctorId": "doc1",
    "appointmentDateTime": "2025-09-01T10:00:00",
    "reason": "Regular checkup"
  }'
```

## Next Steps
1. Implement JWT authentication for secure API access
2. Add appointment status management (confirm, complete, cancel)
3. Add doctor availability scheduling
4. Implement prescription management
5. Add email notifications for appointments
6. Add payment integration

## Notes
- The database is automatically seeded with sample doctors on first run
- All doctor IDs in responses use the frontend format (`doc1`, `doc2`, etc.)
- CORS is enabled for frontend integration
- Password hashing is implemented for security
