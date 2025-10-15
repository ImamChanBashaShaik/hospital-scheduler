'use client';

import React from 'react';
import type { Appointment, Doctor, TimeSlot } from '@/types';
import { AppointmentCard } from './AppointmentCard';
import { DEFAULT_CALENDAR_CONFIG } from '@/types';

interface DayViewProps {
  appointments: Appointment[];
  doctor: Doctor | undefined;
  date: Date;
}

export function DayView({ appointments, doctor, date }: DayViewProps) {
  function generateTimeSlots(): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const { startHour, endHour, slotDuration } = DEFAULT_CALENDAR_CONFIG;

    const slotStart = new Date(date);
    slotStart.setHours(startHour, 0, 0, 0);

    while (slotStart.getHours() < endHour) {
      const slotEnd = new Date(slotStart.getTime() + slotDuration * 60000);
      const label = slotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      slots.push({ start: new Date(slotStart), end: slotEnd, label });
      slotStart.setTime(slotEnd.getTime());
    }
    return slots;
  }

  const timeSlots = generateTimeSlots();

  function getAppointmentsForSlot(slot: TimeSlot): Appointment[] {
    return appointments.filter((apt) => {
      const aptStart = new Date(apt.startTime);
      const aptEnd = new Date(apt.endTime);
      return aptStart < slot.end && aptEnd > slot.start;
    });
  }

  const dayAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.startTime);
    return aptDate.toDateString() === date.toDateString();
  });

  return (
    <div className="day-view">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{date.toDateString()}</h3>
        {doctor && (
          <p className="text-sm text-gray-600">
            Dr. {doctor.name} - {doctor.specialty}
          </p>
        )}
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden relative">
        <div className="divide-y divide-gray-100 relative">
          {timeSlots.map((slot, index) => (
            <div key={index} className="flex border-b border-gray-100 relative min-h-[60px]">
              <div className="w-24 p-2 text-sm text-gray-600">{slot.label}</div>
              <div className="flex-1 p-2 relative">
                {getAppointmentsForSlot(slot).map((apt) => (
                  <AppointmentCard key={apt.id} appointment={apt} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {dayAppointments.length === 0 && (
        <div className="mt-4 text-center text-gray-500 text-sm">
          No appointments scheduled for this day
        </div>
      )}
    </div>
  );
}
export default DayView;
