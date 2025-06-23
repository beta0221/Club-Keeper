import { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";

interface UserWithSubscription {
  id: string;
  firstName?: string;
  lastName?: string;
  emailAddresses: { emailAddress: string }[];
  imageUrl?: string;
}

interface AdminCreateAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialValues?: {
    startTime: string;
    endTime: string;
    notes: string;
    userId?: string;
    userEmail?: string;
  };
}

export function AdminCreateAppointmentModal({
  isOpen,
  onClose,
  onSuccess,
  initialValues = {
    startTime: '',
    endTime: '',
    notes: '',
    userId: '',
    userEmail: '',
  },
}: AdminCreateAppointmentModalProps) {
  const [appointment, setAppointment] = useState(initialValues);
  const [users, setUsers] = useState<UserWithSubscription[]>([]);
  const [search, setSearch] = useState('');
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    setAppointment(initialValues);
  }, [initialValues]);

  useEffect(() => {
    if (!isOpen) return;
    setUserLoading(true);
    fetch('/api/admin/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setUsers([]))
      .finally(() => setUserLoading(false));
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!appointment.userId || !appointment.userEmail) return;

    let isSuccess = await handleCreateAppointment();
    if (isSuccess) { onSuccess() }
  };

  if (!isOpen) return null;

  const filteredUsers = users.filter(
    (user) =>
      user.emailAddresses[0]?.emailAddress.toLowerCase().includes(search.toLowerCase()) ||
      `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateAppointment = async (): Promise<boolean> => {
    try {
      // Convert date strings to full datetime strings
      const startDateTime = new Date(appointment.startTime);
      const endDateTime = new Date(appointment.endTime);
      
      // Set default time to 3 PM for start and 12 PM for end
      startDateTime.setHours(15, 0, 0, 0);
      endDateTime.setHours(12, 0, 0, 0);

      const response = await fetch("/api/admin/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
          notes: appointment.notes,
          userId: appointment.userId,
          userEmail: appointment.userEmail
        }),
      });

      if (!response.ok) throw new Error("Failed to create appointment");

      toast.success("Appointment created successfully!");
      return true
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error("Failed to create appointment");
      return false
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium mb-4">Create Appointment</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
            <input
              type="text"
              placeholder="Search user by email or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2"
            />
            <div className="max-h-40 overflow-y-auto border rounded-md">
              {userLoading ? (
                <div className="p-2 text-gray-500 text-sm">Loading users...</div>
              ) : filteredUsers.length === 0 ? (
                <div className="p-2 text-gray-500 text-sm">No users found.</div>
              ) : (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className={`flex items-center p-2 cursor-pointer hover:bg-blue-50 ${appointment.userId === user.id ? 'bg-blue-100' : ''}`}
                    onClick={() => setAppointment({ ...appointment, userId: user.id, userEmail: user.emailAddresses[0]?.emailAddress || '' })}
                  >
                    <img src={user.imageUrl} alt="avatar" className="w-6 h-6 rounded-full mr-2" />
                    <span className="text-sm">{user.firstName} {user.lastName} ({user.emailAddresses[0]?.emailAddress})</span>
                  </div>
                ))
              )}
            </div>
            {appointment.userId && (
              <div className="mt-1 text-xs text-green-600">Selected: {appointment.userEmail}</div>
            )}
          </div>
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
              className={`px-4 py-2 text-sm font-medium text-white rounded-md ${!appointment.userId ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
              disabled={!appointment.userId}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 