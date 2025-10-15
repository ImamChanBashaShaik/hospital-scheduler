import type { Appointment } from '@/types';
import { MOCK_APPOINTMENTS } from '@/data/mockData';

export class AppointmentService {
  static getAppointmentsByDoctorAndDate(doctorId: string, date: Date): Appointment[] {
    return MOCK_APPOINTMENTS.filter((apt) => {
      const aptDate = new Date(apt.startTime);
      const sameDay =
        aptDate.getFullYear() === date.getFullYear() &&
        aptDate.getMonth() === date.getMonth() &&
        aptDate.getDate() === date.getDate();

      const doctorMatch = !doctorId || apt.doctorId === doctorId;
      return sameDay && doctorMatch;
    });
  }

  static getAppointmentsByDoctorAndWeek(doctorId: string, weekStart: Date): Appointment[] {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    return MOCK_APPOINTMENTS.filter((apt) => {
      const aptDate = new Date(apt.startTime);
      const inWeek = aptDate >= weekStart && aptDate <= weekEnd;
      const doctorMatch = !doctorId || apt.doctorId === doctorId;
      return inWeek && doctorMatch;
    });
  }
}
