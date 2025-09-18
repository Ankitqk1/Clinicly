using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CliniclyBackend.Models
{
    public partial class DoctorAppContext : DbContext
    {
        public DoctorAppContext()
        {
        }

        public DoctorAppContext(DbContextOptions<DoctorAppContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Appointment> Appointments { get; set; }
        public virtual DbSet<Doctor> Doctors { get; set; }
        public virtual DbSet<Prescription> Prescriptions { get; set; }
        public virtual DbSet<User> Users { get; set; }

        // ❌ Removed hardcoded OnConfiguring

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.HasKey(e => e.AppointmentId).HasName("PK__Appointm__8ECDFCC29D897BD8");

                entity.Property(e => e.AppointmentDateTime).HasColumnType("datetime");
                entity.Property(e => e.Status).HasMaxLength(20).HasDefaultValue("Scheduled");
                entity.Property(e => e.Reason).HasMaxLength(500);
                entity.Property(e => e.Amount).HasColumnType("decimal(10,2)");

                entity.HasOne(d => d.Doctor).WithMany(p => p.Appointments)
                    .HasForeignKey(d => d.DoctorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Appointments_Doctors");

                entity.HasOne(d => d.User).WithMany(p => p.Appointments)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Appointments_Users");
            });

            modelBuilder.Entity<Doctor>(entity =>
            {
                entity.HasKey(e => e.DoctorId).HasName("PK__Doctors__2DC00EBF871C8250");

                entity.HasIndex(e => e.Email, "UQ__Doctors__A9D105346019C81B").IsUnique();

                entity.Property(e => e.Email).HasMaxLength(150);
                entity.Property(e => e.Name).HasMaxLength(100);
                entity.Property(e => e.Phone).HasMaxLength(20);
                entity.Property(e => e.PasswordHash).HasMaxLength(255);
                entity.Property(e => e.Specialization).HasMaxLength(100);
                entity.Property(e => e.Degree).HasMaxLength(50);
                entity.Property(e => e.Experience).HasMaxLength(50);
                entity.Property(e => e.About).HasMaxLength(1000);
                entity.Property(e => e.AddressLine1).HasMaxLength(200);
                entity.Property(e => e.AddressLine2).HasMaxLength(200);
                entity.Property(e => e.ImageUrl).HasMaxLength(500);
                entity.Property(e => e.Fees).HasColumnType("decimal(10,2)");
            });

            modelBuilder.Entity<Prescription>(entity =>
            {
                entity.HasKey(e => e.PrescriptionId).HasName("PK__Prescrip__40130832A7AF5914");

                entity.HasOne(d => d.Appointment).WithMany(p => p.Prescriptions)
                    .HasForeignKey(d => d.AppointmentId)
                    .HasConstraintName("FK_Prescriptions_Appointments");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4CB0104E82");

                entity.HasIndex(e => e.Email, "UQ__Users__A9D10534E0E80B8C").IsUnique();

                entity.Property(e => e.Email).HasMaxLength(150);
                entity.Property(e => e.Name).HasMaxLength(100);
                entity.Property(e => e.PasswordHash).HasMaxLength(255);
                entity.Property(e => e.Phone).HasMaxLength(20);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
