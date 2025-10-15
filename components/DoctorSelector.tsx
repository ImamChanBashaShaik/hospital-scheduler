// components/DoctorSelector.tsx
'use client';

import { useState, useEffect } from 'react';
import type { Doctor } from '@/types';
import { MOCK_DOCTORS } from '@/data/mockData';

interface DoctorSelectorProps {
  selectedDoctorId: string;
  onDoctorChange: (doctorId: string) => void;
}

export function DoctorSelector({ selectedDoctorId, onDoctorChange }: DoctorSelectorProps) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  // Load doctors (from mock data)
  useEffect(() => {
    setDoctors(MOCK_DOCTORS);
  }, []);

  return (
    <select
      value={selectedDoctorId}
      onChange={(e) => onDoctorChange(e.target.value)}
      className="block w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
    >
      <option value="">Select a doctor...</option>
      {doctors.map((doctor) => (
        <option key={doctor.id} value={doctor.id}>
          Dr. {doctor.name} - {doctor.specialty}
        </option>
      ))}
    </select>
  );
}

export default DoctorSelector;
