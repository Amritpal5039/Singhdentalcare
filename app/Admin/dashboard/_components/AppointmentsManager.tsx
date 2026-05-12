"use client";

import { useState, useEffect } from "react";
import { Loader2, Calendar, Download, Phone, Check, FileText } from "lucide-react";

export function AppointmentsManager() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);
  const [appointmentFilter, setAppointmentFilter] = useState("all");
  const [appointmentStartDate, setAppointmentStartDate] = useState("");
  const [appointmentEndDate, setAppointmentEndDate] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, [appointmentFilter, appointmentStartDate, appointmentEndDate]);

  const fetchAppointments = async () => {
    setIsLoadingAppointments(true);
    try {
      let url = `/api/admin/appointments?filter=${appointmentFilter}`;
      if (appointmentStartDate) url += `&startDate=${appointmentStartDate}`;
      if (appointmentEndDate) url += `&endDate=${appointmentEndDate}`;
      
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) setAppointments(data);
    } catch (err) {
      console.error("Failed to fetch appointments");
    } finally {
      setIsLoadingAppointments(false);
    }
  };

  const handleToggleContacted = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isContacted: !currentStatus }),
      });
      if (res.ok) {
        setAppointments(appointments.map(a => a._id === id ? { ...a, isContacted: !currentStatus } : a));
      }
    } catch (err) {
      console.error("Failed to update appointment");
    }
  };

  const exportToExcel = async () => {
    setIsExporting(true);
    try {
      const { utils, writeFile } = await import("xlsx");
      
      const dataToExport = appointments.map(a => ({
        "Name": a.name,
        "Phone": a.phoneNumber,
        "Location": a.location,
        "Country": a.country,
        "Treatment": a.treatment,
        "Medical History": a.medicalHistory || "N/A",
        "Medication": a.medication || "N/A",
        "Contacted": a.isContacted ? "Yes" : "No",
        "Date": new Date(a.createdAt).toLocaleDateString()
      }));

      const ws = utils.json_to_sheet(dataToExport);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Appointments");
      writeFile(wb, `Appointments_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-[24px] border border-[#d2d2d7] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setAppointmentFilter("all")} 
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${appointmentFilter === "all" ? "bg-[#1d1d1f] text-white" : "bg-gray-100 text-[#6e6e73] hover:bg-gray-200"}`}
          >
            All Requests
          </button>
          <button 
            onClick={() => setAppointmentFilter("non-contacted")} 
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${appointmentFilter === "non-contacted" ? "bg-[#0071e3] text-white" : "bg-gray-100 text-[#6e6e73] hover:bg-gray-200"}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setAppointmentFilter("contacted")} 
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${appointmentFilter === "contacted" ? "bg-green-600 text-white" : "bg-gray-100 text-[#6e6e73] hover:bg-gray-200"}`}
          >
            Contacted
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-[#d2d2d7]">
            <Calendar className="w-4 h-4 text-[#6e6e73]" />
            <input type="date" value={appointmentStartDate} onChange={(e) => setAppointmentStartDate(e.target.value)} className="bg-transparent text-sm outline-none" />
            <span className="text-[#d2d2d7]">to</span>
            <input type="date" value={appointmentEndDate} onChange={(e) => setAppointmentEndDate(e.target.value)} className="bg-transparent text-sm outline-none" />
          </div>
          <button 
            onClick={exportToExcel}
            disabled={isExporting || appointments.length === 0}
            className="bg-white border border-[#d2d2d7] px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-50 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} Export
          </button>
        </div>
      </div>

      {isLoadingAppointments ? (
        <div className="p-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[#0071e3]" /></div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {appointments.map((a) => (
            <div key={a._id} className={`bg-white p-6 rounded-[24px] border transition-all ${a.isContacted ? "border-[#d2d2d7] opacity-80" : "border-[#0071e3] shadow-sm shadow-blue-50"}`}>
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="apple-title-md !text-[19px] !mb-0">{a.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${a.isContacted ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                      {a.isContacted ? "Contacted" : "New Request"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-[#6e6e73] mb-4">
                    <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {a.phoneNumber}</span>
                    <span className="flex items-center gap-1.5 font-medium text-[#1d1d1f]">Treatment: {a.treatment}</span>
                    <span className="flex items-center gap-1.5">Location: {a.location}, {a.country}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(a.createdAt).toLocaleString()}</span>
                  </div>
                  {(a.medicalHistory || a.medication) && (
                    <div className="bg-[#f5f5f7] p-4 rounded-2xl space-y-2 border border-black/[0.03]">
                      {a.medicalHistory && <p className="text-sm"><span className="font-semibold text-[#1d1d1f]">Medical History:</span> {a.medicalHistory}</p>}
                      {a.medication && <p className="text-sm"><span className="font-semibold text-[#1d1d1f]">Medication:</span> {a.medication}</p>}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 lg:flex-col lg:justify-center">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div 
                      onClick={() => handleToggleContacted(a._id, a.isContacted)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${a.isContacted ? "bg-green-500 border-green-500 text-white" : "border-[#d2d2d7] group-hover:border-[#0071e3]"}`}
                    >
                      <Check className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-semibold lg:hidden">Mark as Contacted</span>
                  </label>
                </div>
              </div>
            </div>
          ))}

          {appointments.length === 0 && (
            <div className="p-20 text-center bg-white rounded-[24px] border border-dashed border-[#d2d2d7]">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#6e6e73]">
                <FileText className="w-8 h-8" />
              </div>
              <p className="apple-body text-[#6e6e73]">No appointment requests found for this filter.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
