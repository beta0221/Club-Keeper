"use client";
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface Appointment {
  id: string;
  start_time: string;
  end_time: string;
  status: string;
  notes: string;
}


export default function AppointmentList() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          const response = await fetch('/api/appointments/me');
          if (!response.ok) throw new Error('Failed to fetch appointments');
          const data = await response.json();
          setAppointments(data);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchAppointments();
    }, []);
  
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">My Appointments</h2>
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No appointments found</div>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">
                      {format(new Date(appointment.start_time), 'MMM d, yyyy')}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(appointment.start_time), 'h:mm a')} - 
                      {format(new Date(appointment.end_time), 'h:mm a')}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    appointment.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
                {appointment.notes && (
                  <p className="mt-2 text-sm text-gray-600">{appointment.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }