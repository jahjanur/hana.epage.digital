import { useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { saveDailyActivity } from "../../services/progressServices"; // ✅ Import saveProgress

const db = getFirestore();

const EmailCapture = ({ onEmailSubmit }: { onEmailSubmit: (email: string) => void }) => {
  const [email, setEmail] = useState("");
  const handleSubmit = async () => {
    if (!email) return;
  
    // ✅ Save email in LocalStorage
    localStorage.setItem("userEmail", email);
  
    // ✅ Save email in Firebase Firestore
    await setDoc(doc(db, "users", email), { email }, { merge: true });
  
    console.log("✅ Email saved:", email);
  
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
  
    // ✅ Call saveDailyActivity with 5 arguments
    await saveDailyActivity(email, today, 10, ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"], true);
  
    onEmailSubmit(email);
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Enter your email to save progress"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Save Progress</button>
    </div>
  );
};

export default EmailCapture;