"use client";

import { useState, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-hot-toast";
import { AppLayout } from "@/components/AppLayout";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, startOfMonth, endOfMonth } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CreateAppointmentModal } from '@/components/CreateAppointmentModal';
import { DetailsModal as AppointmentDetailsModal } from "@/components/appointments/DetailModal";

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

export default function AppointmentsPage() {
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
        `/api/appointments?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();

      const calendarEvents = data.map((appointment: Appointment) => {
        let name = appointment.user ? `⭐ ${appointment.user!.name}` : "已預訂"
        return {
          id: appointment.id,
          title: `${name}(${appointment.id.slice(-5)})`,
          start: new Date(appointment.start_time),
          end: new Date(appointment.end_time),
          status: appointment.status,
          notes: appointment.notes,
          user: appointment.user,
        }
      });

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


    console.log({ start, end })
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

      const response = await fetch("/api/appointments", {
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
    if (!event.user) { return }
    setSelectedEvent(event);
    setPendingNotes(event.notes || "");
    setShowDetailsModal(true);
  };

  const handleUpdateNotes = async () => {
    if (!selectedEvent) return;

    try {
      setIsUpdating(true);
      const response = await fetch(`/api/appointments/${selectedEvent.id}`, {
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
      const response = await fetch(`/api/appointments/${selectedEvent.id}`, {
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
    <AppLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">


            <h1 className="text-3xl font-bold text-gray-900 mb-8">Appointment</h1>
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


          <div className="bg-white rounded-lg shadow p-6">

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
            <AppointmentDetailsModal
              isOpen={showDetailsModal}
              onClose={() => setShowDetailsModal(false)}
              appointment={selectedEvent}
              pendingNotes={pendingNotes}
              isUpdating={isUpdating}
              onNotesChange={setPendingNotes}
              onNotesUpdate={handleUpdateNotes}
              onDelete={handleDeleteAppointment}
            />

            {/* Create Appointment Modal */}
            <CreateAppointmentModal
              isOpen={showCreateModal}
              onClose={() => setShowCreateModal(false)}
              onSubmit={handleCreateAppointment}
              initialValues={newAppointment}
            />


          </div>
        </div>
      </div>
    </AppLayout>

  );
} 