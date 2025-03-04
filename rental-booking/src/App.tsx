import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/root/Home";
import NotFound from "./pages/root/NotFound";
import PropertyList from "./pages/root/PropertyList";
import { dummyAgents, dummyProperties, dummyServices } from "./constants";
import PropertyDetail from "./pages/root/PropertyDetail";
import BookProperty from "./pages/root/BookProperty";
import About from "./pages/root/About";
import Service from "./pages/root/Service";
import AgentPage from "./pages/root/Agents";
import Contact from "./pages/root/ContactUs";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import { MantineProvider } from "@mantine/core";
import Properties from "./pages/dashboard/Properties";
import Bookings from "./pages/dashboard/Bookings";

function App() {
  return (
    <RecoilRoot>
      <MantineProvider>
        <Router>
          {/* <AuthProvider> */}
          <Routes>
            <Route path="/" element={<MainLayout isHome={true} />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="/" element={<MainLayout isHome={false} />}>
              <Route path="about" element={<About />} />
              <Route
                path="properties"
                element={<PropertyList properties={dummyProperties} />}
              />
              <Route path="property/:id" element={<PropertyDetail />} />
              <Route
                path="services"
                element={<Service services={dummyServices} />}
              />
              <Route
                path="agents"
                element={<AgentPage agents={dummyAgents} />}
              />
              <Route path="contact" element={<Contact />} />

              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="book/:id" element={<BookProperty />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="" element={<Overview />} />
              <Route path="properties" element={<Properties />} />
              <Route path="bookings" element={<Bookings />} />
            </Route>
          </Routes>
          {/* </AuthProvider> */}
        </Router>
      </MantineProvider>
    </RecoilRoot>
  );
}

export default App;
