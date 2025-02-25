import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config"; // Ensure Firebase is properly imported

export const saveProgress = async (
  email: string,
  quranPages: number,
  prayers: string[],
  prayedTaraweeh: boolean
) => {
  if (!email) return;

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const userRef = doc(db, "users", email);
  const dailyRef = doc(collection(userRef, "daily_activities"), today); // Store inside daily_activities/{YYYY-MM-DD}

  try {
    // ✅ Get existing data first
    const docSnap = await getDoc(dailyRef);
    let existingPrayers: string[] = [];

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (Array.isArray(data.prayers)) {
        existingPrayers = data.prayers;
      }
    }

    // ✅ Append new prayers without duplicates
    const updatedPrayers = Array.from(new Set([...existingPrayers, ...prayers]));

    await setDoc(
      dailyRef,
      {
        prayers: updatedPrayers, // ✅ Now appends instead of replacing
        quranPages,
        taraweeh: prayedTaraweeh,
      },
      { merge: true }
    );

    console.log("✅ Daily progress saved successfully!");
  } catch (error) {
    console.error("❌ Error saving daily progress:", error);
  }
};