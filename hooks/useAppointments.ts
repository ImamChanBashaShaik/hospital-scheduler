import { useState, useEffect } from 'react';
import type { Appointment } from '@/types';
import { AppointmentService } from '@/services/appointmentService';
import { MOCK_PATIENTS } from '@/data/mockData';

interface UseAppointmentsProps {
  doctorId?: string;
  date: Date;
  view: 'day' | 'week';
}

export function useAppointments({ doctorId, date, view }: UseAppointmentsProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      let result: Appointment[] = [];

      if (view === 'day') {
        result = AppointmentService.getAppointmentsByDoctorAndDate(doctorId || '', date);
      } else {
        const weekStart = getWeekStart(date);
        result = AppointmentService.getAppointmentsByDoctorAndWeek(doctorId || '', weekStart);
      }

      // Enrich with patient info
      const enriched = result.map((apt) => ({
        ...apt,
        patient: MOCK_PATIENTS.find((p) => p.id === apt.patientId)!,
      }));

      setAppointments(enriched);
      setLoading(false);
    } catch {
      setError('Failed to fetch appointments');
      setLoading(false);
    }
  }, [doctorId, date, view]);

  return { appointments, loading, error };
}

function getWeekStart(date: Date): Date {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}
