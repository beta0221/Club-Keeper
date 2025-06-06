import { useState, useEffect } from 'react';

interface CreateAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (appointment: {
    startTime: string;
    endTime: string;
    notes: string;
  }) => void;
  initialValues?: {
    startTime: string;
    endTime: string;
    notes: string;
  };
}

export function CreateAppointmentModal({
  isOpen,
  onClose,
  onSubmit,
  initialValues = {
    startTime: '',
    endTime: '',
    notes: '',
  },
}: CreateAppointmentModalProps) {
  const [appointment, setAppointment] = useState(initialValues);

  // Update local state when initialValues change
  useEffect(() => {
    setAppointment(initialValues);
  }, [initialValues]);

  const handleSubmit = () => {
    onSubmit(appointment);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium mb-4">Create Appointment</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="date"
              value={appointment.startTime}
              onChange={(e) =>
                setAppointment({ ...appointment, startTime: e.target.value })
              }
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="date"
              value={appointment.endTime}
              onChange={(e) =>
                setAppointment({ ...appointment, endTime: e.target.value })
              }
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (optional)
            </label>
            <textarea
              value={appointment.notes}
              onChange={(e) =>
                setAppointment({ ...appointment, notes: e.target.value })
              }
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              placeholder="Add any notes or requirements..."
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 