/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import RecentStats from "@/components/dashboard/RecentStats";
import { DataTable } from "@/components/table/PaginatedTable";
import { getGreeting } from "@/lib/utils";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { propertyColumns } from "./Properties";
import useAuth from "@/hooks/useAuth";
import useProperties from "@/hooks/useProperties";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, 
  Building, 
  Building2, 
  Crown, 
  Home, 
  MoreHorizontal, 
  Plus, 
  RefreshCw 
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

// Sample booking data with more detailed information
const bookingsData = [
  { month: "Feb", bookings: 180, revenue: 75000, occupancy: 68 },
  { month: "Mar", bookings: 200, revenue: 82000, occupancy: 72 },
  { month: "Apr", bookings: 220, revenue: 90000, occupancy: 76 },
  { month: "May", bookings: 230, revenue: 94000, occupancy: 78 },
  { month: "Jun", bookings: 245, revenue: 97000, occupancy: 82 },
  { month: "Jul", bookings: 260, revenue: 102000, occupancy: 85 },
  { month: "Aug", bookings: 275, revenue: 108000, occupancy: 89 },
];

const propertyTypes = [
  { 
    name: "Houses", 
    count: 14456, 
    icon: <Home className="text-white" size={28} />, 
    trend: "+2.4%",
    trending: "up"
  },
  { 
    name: "Apartments", 
    count: 8932, 
    icon: <Building2 className="text-white" size={28} />,
    trend: "+1.7%",
    trending: "up"
  },
  { 
    name: "Villas", 
    count: 4213, 
    icon: <Building className="text-white" size={28} />,
    trend: "-0.5%",
    trending: "down"
  }
];

const Overview = () => {
  const greeting = getGreeting();
  const { user } = useAuth(); // Get current user details
  const { properties: propertyData } = useProperties(); // Get properties data
  const [chartView, setChartView] = useState("6months");
  const [chartMetric, setChartMetric] = useState("revenue");

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getChartData = () => {
    return bookingsData;
  };

  return (
    <div className="w-full flex flex-col min-h-screen space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-6">
        <div>
          <h1 className="font-bold text-2xl md:text-3xl flex items-center gap-2">
            {greeting} {user?.firstName || ""} 
            <span className="text-2xl">👋</span>
          </h1>
          <p className="text-gray-500 mt-1">
            Here's what's happening with your properties today
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCw size={14} />
            <span>Refresh</span>
          </Button>
          {/* Button only accessible by HOSTs */}
          {user?.role === "HOST" && (
            <Button className="gap-2">
              <Plus size={16} />
              <span>Add Property</span>
            </Button>
          )}
        </div>
      </div>

      {/* Recent Stats Section */}
      <RecentStats />

      {/* Charts and Popular Units */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Card */}
        <Card className="col-span-1 lg:col-span-2 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl">Performance Overview</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Track your bookings and revenue performance
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Tabs 
                defaultValue="revenue" 
                value={chartMetric}
                onValueChange={setChartMetric}
                className="w-full sm:w-auto"
              >
                <TabsList className="grid grid-cols-2 w-full sm:w-auto">
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Tabs 
                defaultValue="6months" 
                value={chartView}
                onValueChange={setChartView}
                className="w-full sm:w-auto"
              >
                <TabsList className="grid grid-cols-3 w-full sm:w-auto">
                  <TabsTrigger value="30days">30D</TabsTrigger>
                  <TabsTrigger value="6months">6M</TabsTrigger>
                  <TabsTrigger value="1year">1Y</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={getChartData()} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={value => chartMetric === 'revenue' ? formatCurrency(value).replace(',000', 'k') : value} />
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <Tooltip formatter={(value, name) => name === 'Revenue' ? formatCurrency(value) : value} />
                {chartMetric === 'revenue' && (
                  <Area type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                )}
                {chartMetric === 'bookings' && (
                  <Area type="monotone" dataKey="bookings" stroke="#0EA5E9" strokeWidth={2} fillOpacity={1} fill="url(#colorBookings)" />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Property Insights Card */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Property Insights</CardTitle>
              <Button variant="ghost" size="icon">
                <MoreHorizontal size={18} />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 font-medium">Total Properties</p>
              <div className="flex items-end justify-between mt-1">
                <h3 className="text-2xl font-bold">{(27601).toLocaleString()}</h3>
                <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
                  <ArrowUpRight size={12} />
                  <span>+4.3%</span>
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              {propertyTypes.map((type, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-primary flex items-center justify-center">
                      {type.icon}
                    </div>
                    <div>
                      <p className="font-medium">{type.name}</p>
                      <p className="text-sm text-gray-500">{type.count.toLocaleString()} units</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`flex items-center gap-1 ${type.trending === "up" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                    {type.trend}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Available only for HOSTs */}
            {user?.role === "HOST" && (
              <Button className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600">
                <div className="flex items-center justify-center gap-2">
                  <Crown size={16} />
                  <span>Upgrade to Pro for Analytics</span>
                </div>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Properties Table Section */}
      <div className="pt-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <CardTitle className="text-xl">Your Properties</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Manage and monitor all your property listings</p>
              </div>
              {/* Available only for HOSTs */}
              {user?.role === "HOST" && (
                <Button>
                  <Plus size={16} className="mr-2" />
                  Add New Property
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <DataTable 
              data={propertyData ?? []} 
              columns={propertyColumns} 
              filterPlaceholder="Search properties..." 
              addNewComponent={null}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
