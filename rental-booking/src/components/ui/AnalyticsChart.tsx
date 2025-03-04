import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

const data = [
  { month: "Feb", leads: 20000, campaigns: 18000 },
  { month: "Mar", leads: 25000, campaigns: 20000 },
  { month: "Apr", leads: 27000, campaigns: 23000 },
  { month: "May", leads: 29000, campaigns: 25000 },
  { month: "Jun", leads: 45591, campaigns: 30000 },
  { month: "Jul", leads: 33000, campaigns: 28000 },
  { month: "Aug", leads: 35000, campaigns: 29000 },
  { month: "Sep", leads: 40000, campaigns: 31000 },
  { month: "Oct", leads: 42000, campaigns: 33000 },
  { month: "Nov", leads: 43000, campaigns: 35000 },
  { month: "Dec", leads: 46000, campaigns: 38000 },
  { month: "Jan", leads: 49000, campaigns: 40000 },
];

const AnalyticsChart = () => {
  const [filter, setFilter] = useState("Monthly");

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Analytics</h2>
        <div className="space-x-2">
          {["Daily", "Monthly", "Yearly"].map((option) => (
            <button
              key={option}
              className={`px-4 py-2 rounded-lg ${
                filter === option ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" stroke="#A0AEC0" />
          <YAxis stroke="#A0AEC0" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "10px", padding: "10px" }} />
          <Legend />
          <Line type="monotone" dataKey="leads" stroke="#4F46E5" strokeWidth={3} dot={{ r: 5 }} name="Leads" />
          <Line type="monotone" dataKey="campaigns" stroke="#0EA5E9" strokeWidth={3} dot={{ r: 5 }} name="Campaigns" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
