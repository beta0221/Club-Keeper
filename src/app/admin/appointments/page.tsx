"use client";

import { useState, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-hot-toast";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, startOfMonth, endOfMonth } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Appointment {
  id: string;
  start_time: string;
  end_time: string;
  status: string;
  notes?: string;
  user: {
    name: string | null;
    email: string;
  };
}

interface CalendarEvent {
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
}

export default function AdminAppointmentsPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [newAppointment, setNewAppointment] = useState({
    startTime: "",
    endTime: "",
    notes: "",
  });
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [pendingNotes, setPendingNotes] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, [currentDate]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const startDate = startOfMonth(currentDate);
      const endDate = endOfMonth(currentDate);

      const response = await fetch(
        `/api/admin/appointments?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      
      const calendarEvents = data.map((appointment: Appointment) => ({
        id: appointment.id,
        title: `${appointment.user.name}(${appointment.id.slice(-5)})`,
        start: new Date(appointment.start_time),
        end: new Date(appointment.end_time),
        status: appointment.status,
        notes: appointment.notes,
        user: appointment.user,
      }));
      
      setEvents(calendarEvents);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };


  const isLessThanTwoDaysApart = (date1: Date, date2: Date): boolean => {
    const diffInMs = Math.abs(date1.getTime() - date2.getTime());
    const twoDaysInMs = 2 * 24 * 60 * 60 * 1000; // 2 天的毫秒數
    return diffInMs < twoDaysInMs;
  }
  const subtractOneDay = (date: Date): Date => {
    const newDate = new Date(date); // 複製原本的 Date，避免修改原值
    newDate.setDate(newDate.getDate() - 1);
    return newDate;
  }

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    
    if (isLessThanTwoDaysApart(start, end)) {
      toast.error("Appointment must be a range of at least 2 days");
      return;
    }

    setNewAppointment({
      startTime: format(start, "yyyy-MM-dd"),
      endTime: format(subtractOneDay(end), "yyyy-MM-dd"),
      notes: "",
    });
    setShowCreateModal(true);
  };

  const handleCreateAppointment = async () => {
    try {
      // Convert date strings to full datetime strings
      const startDateTime = new Date(newAppointment.startTime);
      const endDateTime = new Date(newAppointment.endTime);
      
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
          notes: newAppointment.notes,
        }),
      });

      if (!response.ok) throw new Error("Failed to create appointment");

      toast.success("Appointment created successfully!");
      setShowCreateModal(false);
      setNewAppointment({ startTime: "", endTime: "", notes: "" });
      fetchAppointments();
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error("Failed to create appointment");
    }
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setPendingNotes(event.notes || "");
    setShowDetailsModal(true);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedEvent) return;

    try {
      const response = await fetch(`/api/admin/appointments/${selectedEvent.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update appointment status");

      toast.success("Appointment status updated successfully!");
      setSelectedEvent({ ...selectedEvent, status: newStatus });
      fetchAppointments(); // Refresh the calendar
    } catch (error) {
      console.error("Error updating appointment status:", error);
      toast.error("Failed to update appointment status");
    }
  };

  const handleUpdateNotes = async () => {
    if (!selectedEvent) return;

    try {
      setIsUpdating(true);
      const response = await fetch(`/api/admin/appointments/${selectedEvent.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes: pendingNotes }),
      });

      if (!response.ok) throw new Error("Failed to update appointment notes");

      toast.success("Appointment notes updated successfully!");
      setSelectedEvent({ ...selectedEvent, notes: pendingNotes });
      fetchAppointments(); // Refresh the calendar
    } catch (error) {
      console.error("Error updating appointment notes:", error);
      toast.error("Failed to update appointment notes");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAppointment = async () => {
    if (!selectedEvent) return;

    if (!confirm("Are you sure you want to delete this appointment?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/appointments/${selectedEvent.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete appointment");

      toast.success("Appointment deleted successfully!");
      setShowDetailsModal(false);
      fetchAppointments(); // Refresh the calendar
    } catch (error) {
      console.error("Error deleting appointment:", error);
      toast.error("Failed to delete appointment");
    }
  };

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = "#e5e7eb"; // default gray
    if (event.status === "confirmed") {
      backgroundColor = "#86efac"; // green
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        opacity: 0.8,
        color: "#1f2937",
        border: "0px",
        display: "block",
      },
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Appointments</h1>
          <button
            onClick={() => {
              setNewAppointment({ startTime: "", endTime: "", notes: "" });
              setShowCreateModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Appointment
          </button>
        </div>

        {/* Calendar View */}
        <div className="bg-white rounded-lg shadow p-4">
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <div className="h-[800px]">
              <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "100%" }}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                views={["month"]}
                defaultView="month"
                date={currentDate}
                onNavigate={(date) => setCurrentDate(date)}
              />
            </div>
          )}
        </div>

        {/* Appointment Details Modal */}
        {showDetailsModal && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">Appointment Details</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
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
                    {selectedEvent.user.name || selectedEvent.user.email}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {format(selectedEvent.start, "Pp")} - {format(selectedEvent.end, "Pp")}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={pendingNotes}
                    onChange={(e) => setPendingNotes(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                    placeholder="Add or edit notes..."
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={handleUpdateNotes}
                      disabled={isUpdating || pendingNotes === selectedEvent.notes}
                      className={`px-3 py-1 text-sm font-medium rounded-md ${
                        isUpdating || pendingNotes === selectedEvent.notes
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
                    value={selectedEvent.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className={`w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      selectedEvent.status === "confirmed"
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
                    onClick={handleDeleteAppointment}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Appointment Modal */}
        {showCreateModal && (
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
                    value={newAppointment.startTime}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, startTime: e.target.value })
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
                    value={newAppointment.endTime}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, endTime: e.target.value })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (optional)
                  </label>
                  <textarea
                    value={newAppointment.notes}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, notes: e.target.value })
                    }
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                    placeholder="Add any notes or requirements..."
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateAppointment}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 