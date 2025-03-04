import { MantineProvider } from "@mantine/core";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import DashboardLayout from "./components/layouts/DashboardLayout";
import MainLayout from "./components/layouts/MainLayout";
import { dummyAgents, dummyProperties, dummyServices } from "./constants";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import DashboardAgent from "./pages/dashboard/Agents";
import Bookings from "./pages/dashboard/Bookings";
import Overview from "./pages/dashboard/Overview";
import Properties from "./pages/dashboard/Properties";
import About from "./pages/root/About";
import AgentPage from "./pages/root/Agents";
import BookProperty from "./pages/root/BookProperty";
import Contact from "./pages/root/ContactUs";
import Home from "./pages/root/Home";
import NotFound from "./pages/root/NotFound";
import PropertyDetail from "./pages/root/PropertyDetail";
import PropertyList from "./pages/root/PropertyList";
import Service from "./pages/root/Service";

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
              <Route path="agents" element={<DashboardAgent />} />
            </Route>
          </Routes>
          {/* </AuthProvider> */}
        </Router>
      </MantineProvider>
    </RecoilRoot>
  );
}

export default App;
