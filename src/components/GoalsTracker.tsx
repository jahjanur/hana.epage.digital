import React, { useState, useEffect } from "react";
import "./GoalsTracker.css";
import { IoClose } from "react-icons/io5";
import { FaPrayingHands, FaMosque, FaQuran } from "react-icons/fa";
import { ReactComponent as HanaLogo } from "../assets/hanaMainLogoWhite.svg";
import BG from "../assets/BG.png";
import { getProgress } from "../services/getProgress";
import { saveDailyActivity } from "../services/progressServices";

interface Goal {
  id: string;
  type: "namaz" | "teravi" | "quran";
  date: string;
  details: {
    prayerName?: "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";
    pagesRead?: number;
    tarawihRakats?: number;
  };
}

const GoalsTracker: React.FC = () => {
  // Local state for goals (loaded from localStorage)
  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem("ramadanGoals");
    return saved ? JSON.parse(saved) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<Goal["type"] | null>(null);
  const [selectedPrayers, setSelectedPrayers] = useState<Set<string>>(new Set());
  // For quran and teravi modals
  const [prayerDetails, setPrayerDetails] = useState({ pagesRead: 0, tarawihRakats: 0 });
  const [activeTab, setActiveTab] = useState<"goals" | "reports">("goals");

  // Persist goals locally
  useEffect(() => {
    localStorage.setItem("ramadanGoals", JSON.stringify(goals));
  }, [goals]);

  // getGoalProgress simply filters the goals for today's date
  const getGoalProgress = (type: Goal["type"]) => {
    const today = new Date().toDateString();
    const todayGoals = goals.filter(
      (goal) => goal.type === type && new Date(goal.date).toDateString() === today
    );
    switch (type) {
      case "namaz":
        return `${todayGoals.length}/5 Prayers`;
      case "teravi":
        const rakats = todayGoals.reduce(
          (sum, goal) => sum + (goal.details.tarawihRakats || 0),
          0
        );
        return `${rakats}/20 Rakats`;
      case "quran":
        const pages = todayGoals.reduce(
          (sum, goal) => sum + (goal.details.pagesRead || 0),
          0
        );
        return `${pages} Pages`;
      default:
        return "0";
    }
  };

  // When user clicks a prayer button (for namaz), save that prayer if not already selected
  const handlePrayerClick = async (prayer: "fajr" | "dhuhr" | "asr" | "maghrib" | "isha") => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      console.error("❌ No user email found! Cannot save progress.");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    if (selectedPrayers.has(prayer)) return; // Already logged
    try {
      const updatedPrayers = [...Array.from(selectedPrayers), prayer];
      // Save with 0 quran pages and taraweeh false (since this is just a prayer log update)
      await saveDailyActivity(userEmail, today, 0, updatedPrayers, false);
      console.log(`✅ Prayer ${prayer} logged successfully!`);
      setSelectedPrayers((prev) => new Set([...prev, prayer]));
    } catch (error) {
      console.error("❌ Error saving prayer:", error);
    }
  };

  // When user submits the modal for quran or teravi, update the progress without overwriting other fields
  const handleModalSubmit = async () => {
    if (!modalType) return;
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      console.error("❌ No user email found. Cannot save progress.");
      return;
    }
    const today = new Date().toISOString().split("T")[0];

    try {
      // Fetch existing data from Firestore
      const existingData = (await getProgress(userEmail, today)) || {};
      const previousPrayers: string[] = existingData.prayer_log || [];
      const previousQuranPages: number =
        typeof existingData.quran_progress === "number" ? existingData.quran_progress : 0;
      const previousTaraweeh: boolean = typeof existingData.taraweeh === "boolean" ? existingData.taraweeh : false;

      // Update values based on modal type
      const updatedPrayers =
        modalType === "namaz"
          ? Array.from(new Set([...previousPrayers, ...Array.from(selectedPrayers)]))
          : previousPrayers;
      const updatedQuranPages =
        modalType === "quran" ? previousQuranPages + prayerDetails.pagesRead : previousQuranPages;
      const updatedTaraweeh = modalType === "teravi" ? true : previousTaraweeh;

      await saveDailyActivity(userEmail, today, updatedQuranPages, updatedPrayers, updatedTaraweeh);
      console.log("✅ Daily Activity Saved Successfully!");

      // Update local state to reflect new progress (if needed)
      setGoals((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: modalType,
          date: today,
          details: {
            prayerName: modalType === "namaz" ? Array.from(selectedPrayers)[0] as any : undefined,
            pagesRead: modalType === "quran" ? prayerDetails.pagesRead : undefined,
            tarawihRakats: modalType === "teravi" ? prayerDetails.tarawihRakats : undefined,
          },
        },
      ]);

      setIsModalOpen(false);
      setSelectedPrayers(new Set());
      setPrayerDetails({ pagesRead: 0, tarawihRakats: 0 });
    } catch (error) {
      console.error("❌ Error saving activity:", error);
    }
  };

  const renderPrayerSelector = () => (
    <div className="prayer-grid">
      {["fajr", "dhuhr", "asr", "maghrib", "isha"].map((prayer) => (
        <button
          key={prayer}
          className={`prayer-button ${selectedPrayers.has(prayer) ? "completed" : "pending"}`}
          onClick={() => handlePrayerClick(prayer as any)}
          disabled={selectedPrayers.has(prayer)}
        >
          <FaPrayingHands />
          <span>{prayer.charAt(0).toUpperCase() + prayer.slice(1)}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="goals-tracker" style={{ backgroundImage: `url(${BG})` }}>
      <div className="goals-overlay"></div>
      <div className="goals-header">
        <HanaLogo className="hana-logo" />
      </div>

      <div className="goals-content">
        <div className="tabs">
          <button className={`tab ${activeTab === "goals" ? "active" : ""}`} onClick={() => setActiveTab("goals")}>
            Goals
          </button>
          <button className={`tab ${activeTab === "reports" ? "active" : ""}`} onClick={() => setActiveTab("reports")}>
            Reports
          </button>
        </div>

        {activeTab === "goals" ? (
          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-cards">
              <div className="action-card" onClick={() => { setModalType("namaz"); setIsModalOpen(true); }}>
                <FaPrayingHands />
                <h3>Daily Prayers</h3>
                <p>{getGoalProgress("namaz")}</p>
              </div>
              <div className="action-card" onClick={() => { setModalType("teravi"); setIsModalOpen(true); }}>
                <FaMosque />
                <h3>Taraweeh</h3>
                <p>{getGoalProgress("teravi")}</p>
              </div>
              <div className="action-card" onClick={() => { setModalType("quran"); setIsModalOpen(true); }}>
                <FaQuran />
                <h3>Quran Reading</h3>
                <p>{getGoalProgress("quran")}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="reports-container">
            <h2>Activity Reports</h2>
            <p>Coming soon...</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>
                {modalType
                  ? `Add ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`
                  : "Add Activity"}
              </h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <IoClose />
              </button>
            </div>

            <div className="modal-body">
              {modalType === "namaz" && (
                <>
                  <p className="modal-subtitle">Select the prayers you've completed</p>
                  {renderPrayerSelector()}
                </>
              )}
              {modalType === "teravi" && (
                <>
                  <p className="modal-subtitle">Did you pray Taraweeh today?</p>
                  <div className="tarawih-selector">
                    <button
                      className={`tarawih-button ${prayerDetails.tarawihRakats === 20 ? "completed" : ""}`}
                      onClick={() =>
                        setPrayerDetails({ ...prayerDetails, tarawihRakats: 20 })
                      }
                    >
                      <FaMosque />
                      <span>Prayed</span>
                    </button>
                    <button
                      className={`tarawih-button ${prayerDetails.tarawihRakats === 0 ? "not-prayed" : ""}`}
                      onClick={() =>
                        setPrayerDetails({ ...prayerDetails, tarawihRakats: 0 })
                      }
                    >
                      <IoClose />
                      <span>Not Prayed</span>
                    </button>
                  </div>
                </>
              )}
              {modalType === "quran" && (
                <>
                  <p className="modal-subtitle">How many pages did you read?</p>
                  <div className="quran-input">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={prayerDetails.pagesRead}
                      onChange={(e) =>
                        setPrayerDetails({
                          ...prayerDetails,
                          pagesRead: parseInt(e.target.value),
                        })
                      }
                      className="quran-pages-input"
                    />
                  </div>
                </>
              )}
            </div>

            <button className="modal-submit" onClick={handleModalSubmit}>
              Add Activity
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsTracker;