import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config"; // Ensure Firebase is properly imported

export const getProgress = async (email: string, date?: string) => {  // 👈 Fix: Accept optional `date`
  if (!email) return null;

  try {
    const today = date || new Date().toISOString().split("T")[0];  // 👈 Default to today if no date provided
    const userRef = doc(db, "users", email, "daily_activities", today);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      console.log("📊 Existing Progress:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("⚠️ No previous progress found.");
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching progress:", error);
    return null;
  }
};