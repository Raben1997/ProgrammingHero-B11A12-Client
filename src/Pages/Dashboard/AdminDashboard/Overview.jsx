import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#F44336"];

const Overview = () => {
  const axiosSecure = useAxiosSecure();

  const { data: scholarships = [] } = useQuery({
    queryKey: ["allScholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships");
      return res.data;
    }
  });

  const { data: applications = [] } = useQuery({
    queryKey: ["allApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    }
  });

  const totalScholarships = scholarships.length;
  const totalApplications = applications.length;

  const appliedScholarshipIds = new Set(applications.map(app => app.scholarshipId));
  const unappliedScholarships = scholarships.filter(sch => !appliedScholarshipIds.has(sch._id)).length;

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count
  }));

  const barData = [
    { name: "Total", count: totalScholarships },
    { name: "Applied", count: totalApplications },
    { name: "Unapplied", count: unappliedScholarships },
  ];

  return (
    <>
      <h2 className="text-green-700 text-center">
        System Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart Card */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h4 className="text-green-700 text-center mb-2">
            Scholarship Summary
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#4CAF50" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart Card */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h4 className="text-green-700 text-center mb-2">
            Application Status Breakdown
          </h4>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center mt-10">
              No application data available
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Overview;
