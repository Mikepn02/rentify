import StatsCard from "@/components/cards/StatsCard";
import { IconButton } from "@/components/ui/IconButton";
import { getGreeting } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { DataTable } from "@/components/table/PaginatedTable";
import { propertyColumns, propertyData } from "./Properties";

const stats = [
  { title: "Total Bookings", value: "245" },
  { title: "Occupancy Rate", value: "78%" },
  { title: "Upcoming Check-ins", value: "12" },
  { title: "Upcoming Check-outs", value: "8" },
  { title: "Total Revenue", value: "$85,320" },
  { title: "Outstanding Payments", value: "$12,450" },
  { title: "Average Stay Duration", value: "4.5 nights" },
  { title: "Cancellation Rate", value: "6.2%" },
  { title: "Maintenance Requests", value: "5 open" },
];

const bookingsData = [
  { month: "Feb", bookings: 180, revenue: 75000 },
  { month: "Mar", bookings: 200, revenue: 82000 },
  { month: "Apr", bookings: 220, revenue: 90000 },
  { month: "May", bookings: 230, revenue: 94000 },
  { month: "Jun", bookings: 245, revenue: 97000 },
  { month: "Jul", bookings: 260, revenue: 102000 },
  { month: "Aug", bookings: 275, revenue: 108000 },
];

const Overview = () => {
  const greeting = getGreeting();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stats.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [itemsPerPage]);

  return (
    <div className="w-full flex flex-col min-h-screen">
      <h1 className="font-bold text-lg md:text-2xl mt-10">
        {greeting} John 👋! -
        <span className="text-gray-300 text-lg font-semibold">
          {" "}
          Here is what's happening now
        </span>
      </h1>

      <div className="relative w-full overflow-hidden mt-[34px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {stats
              .slice(currentIndex, currentIndex + itemsPerPage)
              .map((stat, idx) => (
                <StatsCard key={idx} value={stat.value} title={stat.title} />
              ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-5 mt-10">
        <div className="bg-white w-full md:w-2/3 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold mb-4">Stat Summary</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={bookingsData}>
              <XAxis dataKey="month" stroke="#A0AEC0" />
              <YAxis stroke="#A0AEC0" />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="bookings"
                stroke="#4F46E5"
                fill="#4F46E5"
                fillOpacity={0.3}
                name="Bookings"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#0EA5E9"
                fill="#0EA5E9"
                fillOpacity={0.3}
                name="Revenue"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/3 bg-white p-5 rounded-xl">
          <h1 className="text-xl font-bold">Popular Units</h1>

          <p className="font-semibold mt-5">Sold All the times</p>
          <p>
            <span className="font-semibold">53456</span> units
          </p>

          <div className="border-[1px] border-t my-7" />

          <div className="grid grid-cols-3 gap-5 ">
            <div>
              <IconButton
                variant={"xl"}
                className="w-full bg-primary-light rounded-md p-5"
              >
                <Icon
                  icon="mdi:home"
                  width="30"
                  height="30"
                  className="text-white"
                />
              </IconButton>
              <h1 className="text-gray-primary/75 font-bold text-center mt-2">
                House
              </h1>
              <p className="font-bold text-center text-lg">14,456</p>
            </div>
            <div>
              <IconButton
                variant={"xl"}
                className="w-full bg-primary-light rounded-md p-5"
              >
                <Icon
                  icon="mdi:office-building"
                  width="30"
                  height="30"
                  className="text-white"
                />
              </IconButton>
              <h1 className="text-gray-primary/75 font-bold text-center mt-2">
                Apartment
              </h1>
              <p className="font-bold text-center text-lg">14,456</p>
            </div>
            <div>
              <IconButton
                variant={"xl"}
                className="w-full bg-primary-light rounded-md p-5"
              >
                <Icon
                  icon="mdi:home-modern"
                  width="30"
                  height="30"
                  className="text-white"
                />
              </IconButton>
              <h1 className="text-gray-primary/75 font-bold text-center">
                Villa
              </h1>
              <p className="font-bold text-center text-lg">14,456</p>
            </div>
          </div>

          <div className="w-full rounded-xl bg-primary-light mt-10 flex items-center justify-center gap-2 p-1">
            <Icon
              icon="mdi:crown"
              width="20"
              height="20"
              className="text-white"
            />
            <h1 className="text-white font-bold">Get More analysis with pro plan</h1>
          </div>
        </div>
      </div>

      <div className="w-full rounded-xl py-10">
        <DataTable data={propertyData} columns={propertyColumns} filterPlaceholder="Filter Properties...."  addNewLabel="Add New Property"/>
      </div>

      
    </div>
  );
};

export default Overview;
