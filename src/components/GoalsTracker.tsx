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
  // Using the specific literal union type for selected prayers
  const [selectedPrayers, setSelectedPrayers] = useState<
    Set<"fajr" | "dhuhr" | "asr" | "maghrib" | "isha">
  >(new Set());
  // For quran and teravi modals
  const [prayerDetails, setPrayerDetails] = useState({ pagesRead: 0, tarawihRakats: 0 });
  const [activeTab, setActiveTab] = useState<"goals" | "reports">("goals");

  // Persist goals locally
  useEffect(() => {
    localStorage.setItem("ramadanGoals", JSON.stringify(goals));
  }, [goals]);

  // When the namaz modal opens, initialize selectedPrayers from today's goals
  useEffect(() => {
    if (modalType === "namaz") {
      const today = new Date().toISOString().split("T")[0];
      const prayersFromGoals = goals
        .filter(
          (goal) =>
            goal.type === "namaz" &&
            goal.date === today &&
            goal.details.prayerName
        )
        .map((goal) => goal.details.prayerName) as ("fajr" | "dhuhr" | "asr" | "maghrib" | "isha")[];
      setSelectedPrayers(new Set(prayersFromGoals));
    }
  }, [modalType, goals]);

  // getGoalProgress now caps namaz at 5 and displays Taraweeh as Prayed/Not Prayed
  const getGoalProgress = (type: Goal["type"]) => {
    const todayStr = new Date().toDateString();
    const todayGoals = goals.filter(
      (goal) =>
        goal.type === type &&
        new Date(goal.date).toDateString() === todayStr
    );
    switch (type) {
      case "namaz":
        // Cap the count at 5
        const count = Math.min(todayGoals.length, 5);
        return `${count}/5 Prayers`;
      case "teravi":
        // Show "Prayed" if any entry for today has tarawihRakats === 20; otherwise "Not Prayed"
        const todayTaraweeh = todayGoals.find(
          (goal) => goal.details.tarawihRakats !== undefined
        );
        return todayTaraweeh && todayTaraweeh.details.tarawihRakats === 20
          ? "Prayed"
          : "Not Prayed";
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

  // When user clicks a prayer button (for namaz), log it only if not already recorded
  const handlePrayerClick = async (
    prayer: "fajr" | "dhuhr" | "asr" | "maghrib" | "isha"
  ) => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      console.error("❌ No user email found! Cannot save progress.");
      return;
    }
    const today = new Date().toISOString().split("T")[0];

    // Check if this prayer has already been logged (in saved goals or current selection)
    const alreadyLogged = goals.some(
      (goal) =>
        goal.type === "namaz" &&
        goal.date === today &&
        goal.details.prayerName === prayer
    );
    if (alreadyLogged || selectedPrayers.has(prayer)) {
      console.log("Prayer already logged");
      return;
    }
    // Also check if already reached 5 prayers (considering both saved and selected)
    const todayNamazCount =
      goals.filter((goal) => goal.type === "namaz" && goal.date === today)
        .length + selectedPrayers.size;
    if (todayNamazCount >= 5) {
      console.log("Already 5 prayers logged for today.");
      return;
    }
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

  // When user submits the modal for quran, teravi, or namaz, update progress without overwriting other fields
  const handleModalSubmit = async () => {
    if (!modalType) return;
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      console.error("❌ No user email found. Cannot save progress.");
      return;
    }
    const today = new Date().toISOString().split("T")[0];

    try {
      // Fetch existing data from Firestore and ensure it belongs to the current user
      const fetchedData = await getProgress(userEmail, today);
      const existingData =
        fetchedData &&
        Object.keys(fetchedData).length > 0 &&
        fetchedData.email === userEmail
          ? fetchedData
          : {};

      const previousPrayers: string[] = existingData.prayer_log || [];
      const previousQuranPages: number =
        typeof existingData.quran_progress === "number"
          ? existingData.quran_progress
          : 0;
      const previousTaraweeh: boolean =
        typeof existingData.taraweeh === "boolean"
          ? existingData.taraweeh
          : false;

      if (modalType === "namaz") {
        // For each newly selected prayer (not already in goals), add an entry
        const newNamazGoals: Goal[] = Array.from(selectedPrayers)
          .filter(
            (prayer) =>
              !goals.some(
                (goal) =>
                  goal.type === "namaz" &&
                  goal.date === today &&
                  goal.details.prayerName === prayer
              )
          )
          .map((prayer) => ({
            id: Date.now().toString() + prayer,
            type: "namaz",
            date: today,
            details: {
              prayerName: prayer,
            },
          }));
        // Update the prayer log in Firestore by merging previous entries with new selections
        const updatedPrayers = Array.from(
          new Set([...previousPrayers, ...Array.from(selectedPrayers)])
        );
        await saveDailyActivity(
          userEmail,
          today,
          0,
          updatedPrayers,
          previousTaraweeh
        );
        console.log("✅ Daily Prayers Saved Successfully!");
        setGoals((prev) => [...prev, ...newNamazGoals]);
      } else if (modalType === "quran") {
        const updatedQuranPages = previousQuranPages + prayerDetails.pagesRead;
        await saveDailyActivity(
          userEmail,
          today,
          updatedQuranPages,
          previousPrayers,
          previousTaraweeh
        );
        console.log("✅ Quran Reading Saved Successfully!");
        setGoals((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "quran",
            date: today,
            details: {
              pagesRead: prayerDetails.pagesRead,
            },
          },
        ]);
      } else if (modalType === "teravi") {
        // Only allow one Taraweeh entry per day.
        if (!goals.some((goal) => goal.type === "teravi" && goal.date === today)) {
          await saveDailyActivity(
            userEmail,
            today,
            previousQuranPages,
            previousPrayers,
            prayerDetails.tarawihRakats === 20
          );
          console.log("✅ Taraweeh Activity Saved Successfully!");
          setGoals((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              type: "teravi",
              date: today,
              details: {
                tarawihRakats: prayerDetails.tarawihRakats === 20 ? 20 : 0,
              },
            },
          ]);
        } else {
          console.log("Taraweeh already logged for today.");
        }
      }

      setIsModalOpen(false);
      setSelectedPrayers(new Set());
      setPrayerDetails({ pagesRead: 0, tarawihRakats: 0 });
    } catch (error) {
      console.error("❌ Error saving activity:", error);
    }
  };

  // Compute if Taraweeh is already logged for today
  const today = new Date().toISOString().split("T")[0];
  const alreadyPrayedTaraweeh = goals.some(
    (goal) => goal.type === "teravi" && goal.date === today
  );

  const renderPrayerSelector = () => (
    <div className="prayer-grid">
      {(["fajr", "dhuhr", "asr", "maghrib", "isha"] as const).map((prayer) => (
        <button
          key={prayer}
          className={`prayer-button ${
            selectedPrayers.has(prayer) ? "completed" : "pending"
          }`}
          onClick={() => handlePrayerClick(prayer)}
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
          <button
            className={`tab ${activeTab === "goals" ? "active" : ""}`}
            onClick={() => setActiveTab("goals")}
          >
            Goals
          </button>
          <button
            className={`tab ${activeTab === "reports" ? "active" : ""}`}
            onClick={() => setActiveTab("reports")}
          >
            Reports
          </button>
        </div>

        {activeTab === "goals" ? (
          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-cards">
              <div
                className="action-card"
                onClick={() => {
                  setModalType("namaz");
                  setIsModalOpen(true);
                }}
              >
                <FaPrayingHands />
                <h3>Daily Prayers</h3>
                <p>{getGoalProgress("namaz")}</p>
              </div>
              <div
                className="action-card"
                onClick={() => {
                  setModalType("teravi");
                  setIsModalOpen(true);
                }}
              >
                <FaMosque />
                <h3>Taraweeh</h3>
                <p>{getGoalProgress("teravi")}</p>
              </div>
              <div
                className="action-card"
                onClick={() => {
                  setModalType("quran");
                  setIsModalOpen(true);
                }}
              >
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
                  ? `Add ${modalType.charAt(0).toUpperCase() +
                    modalType.slice(1)}`
                  : "Add Activity"}
              </h2>
              <button
                className="modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                <IoClose />
              </button>
            </div>

            <div className="modal-body">
              {modalType === "namaz" && (
                <>
                  <p className="modal-subtitle">
                    Select the prayers you've completed
                  </p>
                  {renderPrayerSelector()}
                </>
              )}
              {modalType === "teravi" && (
                <>
                  <p className="modal-subtitle">
                    Did you pray Taraweeh today?
                  </p>
                  {alreadyPrayedTaraweeh ? (
                    <p style={{ color: "green", fontWeight: "bold" }}>
                      You have already prayed Taraweeh today.
                    </p>
                  ) : (
                    <div className="tarawih-selector">
                      <button
                        className={`tarawih-button ${
                          prayerDetails.tarawihRakats === 20 ? "completed" : ""
                        }`}
                        onClick={() =>
                          setPrayerDetails({
                            ...prayerDetails,
                            tarawihRakats: 20,
                          })
                        }
                      >
                        <FaMosque />
                        <span>Prayed</span>
                      </button>
                      <button
                        className={`tarawih-button ${
                          prayerDetails.tarawihRakats === 0 ? "not-prayed" : ""
                        }`}
                        onClick={() =>
                          setPrayerDetails({
                            ...prayerDetails,
                            tarawihRakats: 0,
                          })
                        }
                      >
                        <IoClose />
                        <span>Not Prayed</span>
                      </button>
                    </div>
                  )}
                </>
              )}
              {modalType === "quran" && (
                <>
                  <p className="modal-subtitle">
                    How many pages did you read?
                  </p>
                  {/* Updated Quran reading input to a slider */}
                  <div className="quran-input">
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={prayerDetails.pagesRead}
                      onChange={(e) =>
                        setPrayerDetails({
                          ...prayerDetails,
                          pagesRead: parseInt(e.target.value),
                        })
                      }
                    />
                    <span>{prayerDetails.pagesRead} Pages</span>
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