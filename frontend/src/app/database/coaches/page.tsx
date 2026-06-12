"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, Search, AlertCircle } from "lucide-react";
import { listCoaches, CoachData } from "@/lib/api";

export default function CoachesDatabasePage() {
  const [coaches, setCoaches] = useState<CoachData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await listCoaches();
        if (res.success) {
          // Only show approved/paid coaches
          setCoaches(res.coaches.filter((c) => c.paid));
        } else {
          setError("Failed to load coaches.");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching coaches.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredCoaches = coaches.filter(
    (c) =>
      c.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 bg-background text-foreground flex flex-col py-16">
      <div className="max-w-6xl w-full mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 border border-gray-200">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-heading font-bold uppercase tracking-widest text-primary mb-2">
              Coaches Database
            </h1>
            <p className="text-gray-500 text-lg">
              Official roster of licensed coaches and trainers.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/database"
              className="border border-gray-200 text-primary px-6 py-3 text-sm font-bold tracking-widest uppercase hover:bg-gray-50 transition-colors rounded-sm shadow-sm text-center"
            >
              &larr; Back
            </Link>
            <Link
              href="/register/coach"
              className="bg-accent text-white px-6 py-3 text-sm font-bold tracking-widest uppercase hover:bg-accent/90 transition-colors rounded-sm shadow-md text-center"
            >
              Register as Coach
            </Link>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-sm shadow-sm p-6 mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-6 rounded-sm border border-red-100 flex flex-col items-center justify-center py-12">
            <AlertCircle className="w-10 h-10 mb-4 text-red-500" />
            <p className="font-semibold">{error}</p>
          </div>
        ) : filteredCoaches.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-12 text-center text-gray-500">
            <p className="text-lg">No approved coaches found matching your criteria.</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs">ID No.</th>
                    <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs">Name</th>
                    <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs">District</th>
                    <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs">Occupation</th>
                    <th className="py-4 px-6 font-bold uppercase tracking-wider text-xs">Highest Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCoaches.map((coach) => (
                    <tr key={coach.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-mono text-xs font-bold text-gray-500 whitespace-nowrap">
                        UPHA-C-{coach.id.toString().padStart(4, '0')}
                      </td>
                      <td className="py-4 px-6 font-medium text-primary">
                        {coach.user.name}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {coach.district}
                      </td>
                      <td className="py-4 px-6 text-gray-600 uppercase text-xs font-semibold">
                        {coach.occupation.replace("_", " ")}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {coach.highest_coaching_grade || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
