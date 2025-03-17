import RecentStats from "@/components/dashboard/RecentStats";
import { DataTable } from "@/components/table/PaginatedTable";
import { IconButton } from "@/components/ui/IconButton";
import { getGreeting } from "@/lib/utils";
import { Icon } from "@iconify/react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { propertyColumns, propertyData } from "./Properties";
import useAuth from "@/hooks/useAuth";



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
  const { user } = useAuth();
  

  return (
    <div className="w-full flex flex-col min-h-screen">
      <h1 className="font-bold text-lg md:text-2xl mt-10">
        {greeting} {user?.lastName} 👋! -
        <span className="text-gray-300 text-lg font-semibold">
          {" "}
          Here is what's happening now
        </span>
      </h1>

      {/* Recent Rental Stats */}

      <RecentStats />

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
        <DataTable data={propertyData} columns={propertyColumns} filterPlaceholder="Filter Properties...." />
      </div>

      
    </div>
  );
};

export default Overview;
