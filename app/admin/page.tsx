"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  Car,
  Layers,
  Inbox,
  Sparkles,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getAllVehicles,
  getFeaturedVehicles,
  getCategoriesWithCounts,
  DUMMY_INQUIRIES
} from "@/lib/vehicles/data";

export default function AdminDashboardPage() {
  const allVehicles = useMemo(() => getAllVehicles(), []);
  const featuredVehicles = useMemo(() => getFeaturedVehicles(), []);
  const categories = useMemo(() => getCategoriesWithCounts(), []);

  const totalVehicles = allVehicles.length;
  const publishedVehicles = allVehicles.filter((v) => v.status === "Available").length;
  const draftVehicles = allVehicles.filter((v) => v.status !== "Available").length;

  return (
    <div className="space-y-8">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Vehicle Showcase Dashboard
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Overview of catalog statistics, featured showcase items, and customer inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/vehicles/new">
            <Button variant="primary" size="sm" className="gap-2 font-semibold shadow-sm">
              <Plus className="w-4 h-4" />
              Add New Vehicle
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total Vehicles
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{totalVehicles}</div>
          <span className="text-[10px] text-emerald-600 font-bold block">Active in catalog</span>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Featured Flagships
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{featuredVehicles.length}</div>
          <span className="text-[10px] text-amber-600 font-bold block">Homepage highlights</span>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Categories
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{categories.length}</div>
          <span className="text-[10px] text-slate-500 font-medium block">Body style classes</span>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total Inquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{DUMMY_INQUIRIES.length}</div>
          <span className="text-[10px] text-purple-700 font-bold block">Specification requests</span>
        </div>

        {/* Metric 5 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Published
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{publishedVehicles}</div>
          <span className="text-[10px] text-slate-500 font-medium block">Live available</span>
        </div>

        {/* Metric 6 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Reserved / Draft
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{draftVehicles}</div>
          <span className="text-[10px] text-slate-500 font-medium block">Upcoming or draft</span>
        </div>
      </div>

      {/* Main Grid: Recent Inquiries Table & Featured Vehicles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Inquiries */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Inbox className="w-5 h-5 text-amber-600" />
              Recent Vehicle Inquiries
            </h3>
            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
            >
              View All Inquiries
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="admin-table text-xs">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Vehicle Requested</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {DUMMY_INQUIRIES.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-50">
                    <td className="font-semibold text-slate-900">
                      <div>{inq.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{inq.email}</div>
                    </td>
                    <td className="font-medium text-slate-700 max-w-[180px] truncate">
                      {inq.vehicleName}
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
                    <td className="text-slate-500 font-medium">
                      {new Date(inq.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric"
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Featured Vehicles List */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Featured Flagships
            </h3>
            <Link
              href="/admin/vehicles"
              className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
            >
              Manage All
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {featuredVehicles.slice(0, 5).map((vehicle) => (
              <div
                key={vehicle.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-colors"
              >
                <div className="space-y-0.5 max-w-[200px]">
                  <div className="text-[10px] font-bold text-amber-600 uppercase">
                    {vehicle.make} • {vehicle.year}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {vehicle.model}
                  </h4>
                  <div className="text-[10px] text-slate-500 truncate">
                    {vehicle.horsepower} HP • {vehicle.transmission}
                  </div>
                </div>

                <Link href={`/vehicles/${vehicle.slug}`} target="_blank">
                  <Button variant="ghost" size="sm" className="h-8 text-xs gap-1 text-slate-700">
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
