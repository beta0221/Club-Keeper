import { format } from "date-fns";

interface AppointmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: {
    id: string;
    title: string;
    start: Date;
    end: Date;
    status: string;
    notes?: string;
    user: {
      name: string | null;
      email: string;
    };
  } | null;
  pendingNotes: string;
  isUpdating: boolean;
  onNotesChange: (notes: string) => void;
  onNotesUpdate: () => void;
  onStatusChange: (status: string) => void;
  onDelete: () => void;
}

export function AppointmentDetailsModal({
  isOpen,
  onClose,
  appointment,
  pendingNotes,
  isUpdating,
  onNotesChange,
  onNotesUpdate,
  onStatusChange,
  onDelete,
}: AppointmentDetailsModalProps) {
  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium">Appointment Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">User</label>
            <p className="mt-1 text-sm text-gray-900">
              {appointment.user.name || appointment.user.email}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <p className="mt-1 text-sm text-gray-900">
              {format(appointment.start, "Pp")} - {format(appointment.end, "Pp")}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              value={pendingNotes}
              onChange={(e) => onNotesChange(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              placeholder="Add or edit notes..."
            />
            <div className="mt-2 flex justify-end">
              <button
                onClick={onNotesUpdate}
                disabled={isUpdating || pendingNotes === appointment.notes}
                className={`px-3 py-1 text-sm font-medium rounded-md ${
                  isUpdating || pendingNotes === appointment.notes
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isUpdating ? "Updating..." : "Update Notes"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={appointment.status}
              onChange={(e) => onStatusChange(e.target.value)}
              className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                appointment.status === "confirmed"
                  ? "bg-green-50 text-green-800"
                  : "bg-yellow-50 text-yellow-800"
              }`}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 