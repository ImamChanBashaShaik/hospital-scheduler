'use client';

import React from 'react';
import type { Appointment, Doctor, Patient } from '@/types';
import { APPOINTMENT_TYPE_CONFIG, MOCK_DOCTORS, MOCK_PATIENTS } from '@/types';

interface AppointmentCardProps {
  appointment: Appointment;
  slotHeight?: number; // Height of 30-min slot in pixels (default 40)
  dayStartHour?: number; // Starting hour of the schedule (default 8)
}

/**
 * Displays a single appointment card in the schedule grid with proper positioning.
 */
export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  slotHeight = 40,
  dayStartHour = 8,
}) => {
  const doctor: Doctor | undefined = MOCK_DOCTORS.find((d) => d.id === appointment.doctorId);
  const patient: Patient | undefined = MOCK_PATIENTS.find((p) => p.id === appointment.patientId);
  const typeInfo = APPOINTMENT_TYPE_CONFIG[appointment.type];

  const start = new Date(appointment.startTime);
  const end = new Date(appointment.endTime);

  // Calculate top position in px relative to the grid
  const top =
    ((start.getHours() - dayStartHour) * 60 + start.getMinutes()) * (slotHeight / 30);

  // Calculate height in px based on appointment duration
  const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
  const height = (durationMinutes / 30) * slotHeight;

  return (
    <div
      className="absolute z-10 rounded-lg shadow-md p-2 text-xs text-white cursor-pointer hover:opacity-90 transition-opacity"
      style={{
        backgroundColor: typeInfo.color,
        top,
        height,
        left: 0,
        right: 0,
      }}
      title={`${typeInfo.label}: ${patient?.name || 'Unknown Patient'} (${doctor?.name || 'Unknown Doctor'})`}
    >
      <div className="font-semibold text-sm">{typeInfo.label}</div>
      <div>{patient?.name || 'Unknown Patient'}</div>
      <div className="text-[11px] opacity-90">{doctor?.name}</div>
      <div className="text-[10px] opacity-75">
        {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} -{' '}
        {end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
      </div>
    </div>
  );
};
