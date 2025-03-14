import React from "react";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { showModal } from "@/atoms/state";
import MediaView from "../ui/MediaView";

interface Props {
  isHome: boolean;
}

const MainLayout = ({ isHome }: Props) => {
  const showMedia = useRecoilValue(showModal);
  const showMediaStyles = {
    overflow: "hidden",
    positition: "fixed",
  };

  return (
    <div style={showMedia ? showMediaStyles : {}}>
      {showMedia && <MediaView />}
      <div className="flex flex-col justify-between items-center min-h-screen">
        <Navbar />
        <Outlet />
        <Footer isHome={isHome} />
      </div>
    </div>
  );
};

export default MainLayout;
