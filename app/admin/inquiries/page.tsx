"use client";

import { useState, useEffect } from "react";
import { Inbox, Search, Mail, Phone, Clock, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DUMMY_INQUIRIES } from "@/lib/vehicles/data";
import { VehicleInquiry } from "@/lib/vehicles/types";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<VehicleInquiry[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    try {
      const local = JSON.parse(localStorage.getItem("autora_inquiries") || "[]");
      if (local && local.length > 0) {
        // Merge with dummy inquiries
        const combined = [...local, ...DUMMY_INQUIRIES];
        setInquiries(combined);
      } else {
        setInquiries(DUMMY_INQUIRIES);
      }
    } catch (e) {
      setInquiries(DUMMY_INQUIRIES);
    }
  }, []);

  const filtered = inquiries.filter((inq) => {
    const matchSearch =
      !search ||
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      inq.vehicleName.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "all" || inq.status.toLowerCase() === statusFilter.toLowerCase();

    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, newStatus: "Pending" | "Contacted" | "Closed") => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );
  };

  const deleteInquiry = (id: string) => {
    if (confirm("Delete this customer specification inquiry record?")) {
      setInquiries((prev) => prev.filter((i) => i.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Customer Specification Inquiries
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Review customer specification requests, showroom appointment bookings, and export logistics inquiries.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search customer, email, vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-3 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-800"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>

          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
            {filtered.length} Requests
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="admin-table text-xs">
            <thead>
              <tr>
                <th>Customer & Contact</th>
                <th>Requested Vehicle</th>
                <th>Message / Inquiry</th>
                <th>Submitted Date</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">
                    No customer inquiries match filter parameters.
                  </td>
                </tr>
              ) : (
                filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50">
                    <td className="font-semibold text-slate-900">
                      <div>{inq.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{inq.email}</div>
                      <div className="text-[10px] text-amber-600 font-normal">{inq.phone}</div>
                    </td>

                    <td className="font-bold text-slate-800 max-w-[200px]">
                      {inq.vehicleName}
                    </td>

                    <td className="text-slate-600 max-w-[260px] truncate" title={inq.message}>
                      {inq.message || "No specific comments provided."}
                    </td>

                    <td className="text-slate-500 font-medium whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </td>

                    <td>
                      <span
                        className={
                          inq.status === "Pending"
                            ? "admin-status-orange"
                            : inq.status === "Contacted"
                            ? "admin-status-green"
                            : "admin-status-gray"
                        }
                      >
                        {inq.status}
                      </span>
                    </td>

                    <td className="text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {inq.status === "Pending" && (
                          <button
                            onClick={() => updateStatus(inq.id, "Contacted")}
                            className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded border border-emerald-200 text-[10px] font-bold hover:bg-emerald-100"
                          >
                            Mark Contacted
                          </button>
                        )}
                        {inq.status !== "Closed" && (
                          <button
                            onClick={() => updateStatus(inq.id, "Closed")}
                            className="px-2 py-1 bg-slate-100 text-slate-700 rounded border border-slate-200 text-[10px] font-bold hover:bg-slate-200"
                          >
                            Close
                          </button>
                        )}
                        <button
                          onClick={() => deleteInquiry(inq.id)}
                          className="admin-action admin-action-delete h-7 w-7"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
