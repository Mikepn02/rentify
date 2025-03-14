import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import StatsCard from "../cards/StatsCard";


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

const RecentStats = () => {
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
  );
};

export default RecentStats;
