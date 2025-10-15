'use client';

import React, { useState } from 'react';
import type { CalendarView } from '@/types';
import { DoctorSelector } from './DoctorSelector';
import { DayView } from './DayView';
import { WeekView } from './WeekView';
import { useAppointments } from '@/hooks/useAppointments';
import { MOCK_DOCTORS } from '@/data/mockData';

interface ScheduleViewProps {
  initialDoctorId?: string;
  initialDate?: Date;
}

export function ScheduleView({ initialDoctorId = '', initialDate = new Date() }: ScheduleViewProps) {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(initialDoctorId);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [view, setView] = useState<CalendarView>('day');

  const selectedDoctor = MOCK_DOCTORS.find((d) => d.id === selectedDoctorId);

  const { appointments, loading, error } = useAppointments({
    doctorId: selectedDoctorId,
    date: selectedDate,
    view,
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Doctor Schedule</h2>
          {selectedDoctor && (
            <p className="text-sm text-gray-600 mt-1">
              Dr. {selectedDoctor.name} - {selectedDoctor.specialty}
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <DoctorSelector selectedDoctorId={selectedDoctorId} onDoctorChange={setSelectedDoctorId} />

          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />

          <div className="flex gap-2">
            {['day', 'week'].map((v) => (
              <button
                key={v}
                className={`px-4 py-2 text-sm rounded ${
                  view === v ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setView(v as CalendarView)}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {loading && <div className="text-center text-gray-500">Loading appointments...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {!loading && !error && (
        <>
          {view === 'day' ? (
            <DayView appointments={appointments} doctor={selectedDoctor} date={selectedDate} />
          ) : (
            <WeekView appointments={appointments} doctor={selectedDoctor} weekStartDate={getWeekStart(selectedDate)} />
          )}
        </>
      )}
    </div>
  );
}

function getWeekStart(date: Date): Date {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(date);
  monday.setDate(date.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
}
