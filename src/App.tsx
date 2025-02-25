import React, { useState } from "react";
import "./App.css";
import RamadanCountdown from "./components/RamadanCountdown";
import DuahV from "./components/Duah-V";
import GoalsTracker from "./components/GoalsTracker";
import { Routes, Route } from "react-router-dom";
import BottomNavigation from "./components/BottomNavigation";
import LoaderScreen from "./components/LoaderScreen";
import Notifications from "./components/Notifications/Notifications";
import EmailCapture from "./components/Email/EmailCapture";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  setTimeout(() => setIsLoading(false), 2000);

  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <>
      {/* Global Notifications */}
      <Notifications />

      <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
        {userEmail ? (
          <>
            <h2>Welcome Back, {userEmail}</h2>

            <Routes>
              <Route path="/" element={<RamadanCountdown />} />
              <Route path="/duah-v" element={<DuahV />} />
              <Route path="/goals" element={<GoalsTracker />} />
            </Routes>
          </>
        ) : (
          <EmailCapture onEmailSubmit={setUserEmail} />
        )}
      </div>

      <BottomNavigation />
    </>
  );
};

export default App;