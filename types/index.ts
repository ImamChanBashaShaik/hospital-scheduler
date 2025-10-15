/**
 * Type Definitions for Hospital Appointment Scheduler
 */

// --- Appointment Types ---
export type AppointmentType = 'checkup' | 'consultation' | 'follow-up' | 'procedure';
export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';

// --- Specialties ---
export type Specialty =
  | 'cardiology'
  | 'pediatrics'
  | 'general-practice'
  | 'orthopedics'
  | 'dermatology';

// --- Days of the week ---
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

// --- Doctor ---
export interface WorkingHours {
  start: string; // "HH:MM"
  end: string;
}

export type WeeklySchedule = Partial<Record<DayOfWeek, WorkingHours>>;

export interface Doctor {
  id: string;
  name: string;
  specialty: Specialty;
  email: string;
  phone: string;
  workingHours: WeeklySchedule;
}

// --- Patient ---
export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string; // ISO date
}

// --- Appointment ---
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  type: AppointmentType;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  notes?: string;
  status: AppointmentStatus;
}

// --- Enriched appointment for UI ---
export interface EnrichedAppointment extends Appointment {
  patient: Patient;
  doctor?: Doctor;
  start: Date;
  end: Date;
}

// --- Time Slot ---
export interface TimeSlot {
  start: Date;
  end: Date;
  label: string; // e.g., "9:00 AM"
}

// --- Calendar ---
export type CalendarView = 'day' | 'week';

export interface CalendarConfig {
  startHour: number;
  endHour: number;
  slotDuration: number; // in minutes
}

export const DEFAULT_CALENDAR_CONFIG: CalendarConfig = {
  startHour: 8,
  endHour: 18,
  slotDuration: 30,
};

// --- Appointment display metadata ---
export interface AppointmentTypeInfo {
  type: AppointmentType;
  label: string;
  color: string;
  defaultDuration: number; // minutes
}

export const APPOINTMENT_TYPE_CONFIG: Record<AppointmentType, AppointmentTypeInfo> = {
  checkup: { type: 'checkup', label: 'General Checkup', color: '#3b82f6', defaultDuration: 30 },
  consultation: { type: 'consultation', label: 'Consultation', color: '#10b981', defaultDuration: 60 },
  'follow-up': { type: 'follow-up', label: 'Follow-up', color: '#f59e0b', defaultDuration: 30 },
  procedure: { type: 'procedure', label: 'Procedure', color: '#8b5cf6', defaultDuration: 90 },
};

// --- Mock Data for Testing ---
export const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    specialty: 'cardiology',
    email: 'sarah.chen@hospital.com',
    phone: '+1234567890',
    workingHours: {
      monday: { start: '08:00', end: '16:00' },
      tuesday: { start: '08:00', end: '16:00' },
    },
  },
  {
    id: '2',
    name: 'John Smith',
    specialty: 'pediatrics',
    email: 'john.smith@hospital.com',
    phone: '+1234567891',
    workingHours: {
      monday: { start: '10:00', end: '18:00' },
      wednesday: { start: '08:00', end: '16:00' },
    },
  },
];

export const MOCK_PATIENTS: Patient[] = [
  { id: 'p1', name: 'Alice', email: 'alice@example.com', phone: '+111111111', dateOfBirth: '1990-01-01' },
  { id: 'p2', name: 'Bob', email: 'bob@example.com', phone: '+222222222', dateOfBirth: '1985-05-10' },
  { id: 'p3', name: 'Charlie', email: 'charlie@example.com', phone: '+333333333', dateOfBirth: '1975-03-15' },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    doctorId: '1',
    type: 'checkup',
    startTime: '2025-10-15T09:00:00',
    endTime: '2025-10-15T09:30:00',
    status: 'scheduled',
  },
  {
    id: 'a2',
    patientId: 'p2',
    doctorId: '1',
    type: 'consultation',
    startTime: '2025-10-15T09:15:00',
    endTime: '2025-10-15T10:00:00',
    status: 'scheduled',
  },
  {
    id: 'a3',
    patientId: 'p3',
    doctorId: '2',
    type: 'procedure',
    startTime: '2025-10-16T14:00:00',
    endTime: '2025-10-16T15:30:00',
    status: 'scheduled',
  },
];
