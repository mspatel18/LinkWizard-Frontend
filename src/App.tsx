import "./App.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar.tsx";
import Hero from "@/components/home/Hero.tsx";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard.tsx";
import AllLinks from "./components/userprofile/AllLinks.tsx";
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/:username" element={<AllLinks />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Analytics />
      </ThemeProvider>
    </>
  );
}

export default App;
