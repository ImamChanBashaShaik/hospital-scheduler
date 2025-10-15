'use client';

import React from 'react';
import type { Appointment, Doctor, TimeSlot } from '@/types';
import { AppointmentCard } from './AppointmentCard';
import { DEFAULT_CALENDAR_CONFIG } from '@/types';
import { isSameDay } from 'date-fns';

interface WeekViewProps {
  appointments: Appointment[];
  doctor: Doctor | undefined;
  weekStartDate: Date;
}

export function WeekView({ appointments, doctor, weekStartDate }: WeekViewProps) {
  function getWeekDays(): Date[] {
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(weekStartDate);
      day.setDate(weekStartDate.getDate() + i);
      return day;
    });
  }

  function generateTimeSlots(): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const { startHour, endHour, slotDuration } = DEFAULT_CALENDAR_CONFIG;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let min = 0; min < 60; min += slotDuration) {
        const slotStart = new Date();
        slotStart.setHours(hour, min, 0, 0);
        const slotEnd = new Date(slotStart.getTime() + slotDuration * 60000);
        const label = slotStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        slots.push({ start: slotStart, end: slotEnd, label });
      }
    }
    return slots;
  }

  const weekDays = getWeekDays();
  const timeSlots = generateTimeSlots();

  const getAppointmentsForDay = (date: Date) =>
    appointments.filter((apt) => isSameDay(new Date(apt.startTime), date));

  return (
    <div className="week-view">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Week ({weekDays[0].toDateString()} - {weekDays[6].toDateString()})
        </h3>
        {doctor && <p className="text-sm text-gray-600">Dr. {doctor.name} - {doctor.specialty}</p>}
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full table-fixed border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-20 p-2 border-r text-xs">Time</th>
              {weekDays.map((day, idx) => (
                <th key={idx} className="p-2 border-r text-xs text-center">
                  <div className="font-semibold">{day.toLocaleDateString(undefined, { weekday: 'short' })}</div>
                  <div className="text-gray-600">{day.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, slotIndex) => (
              <tr key={slotIndex} className="border-t">
                <td className="p-1 text-xs text-gray-600">{slot.label}</td>
                {weekDays.map((day, dayIndex) => {
                  const dayAppointments = getAppointmentsForDay(day).filter((apt) => {
                    const aptStart = new Date(apt.startTime);
                    const aptEnd = new Date(apt.endTime);
                    return aptStart < slot.end && aptEnd > slot.start;
                  });

                  return (
                    <td key={dayIndex} className="p-1 border-l align-top min-h-[40px] relative">
                      {dayAppointments.map((apt) => (
                        <AppointmentCard key={apt.id} appointment={apt} />
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {appointments.length === 0 && (
        <div className="mt-4 text-center text-gray-500 text-sm">No appointments scheduled for this week</div>
      )}
    </div>
  );
}
export default WeekView;
