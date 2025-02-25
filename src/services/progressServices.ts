import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config"; // ✅ Ensure Firebase is properly imported

// ✅ Save daily progress to Firestore (Fix for appending prayers)
export const saveDailyActivity = async (
    email: string,
    date: string,
    quranPages: number,
    newPrayers: string[], // Instead of overwriting, we append
    prayedTaraweeh: boolean
  ) => {
  if (!email) return;

  try {
    const todayDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const userDailyCollectionRef = collection(db, "users", email, "daily_activities");
    const userDailyDocRef = doc(userDailyCollectionRef, todayDate);

    // ✅ Fetch existing progress before updating
    const existingDoc = await getDoc(userDailyDocRef);
    let existingPrayers: string[] = [];

    if (existingDoc.exists()) {
      const data = existingDoc.data();
      existingPrayers = Array.isArray(data.prayer_log) ? data.prayer_log : [];
    }

    // ✅ Merge new prayers with existing prayers (avoid duplicates)
    const updatedPrayers = Array.from(new Set([...existingPrayers, ...newPrayers]));

    // ✅ Update Firestore without overwriting previous prayers
    await setDoc(
      userDailyDocRef,
      {
        date: todayDate,
        quran_progress: quranPages,
        prayer_log: updatedPrayers, // ✅ Append prayers instead of overwriting
        taraweeh: prayedTaraweeh,
      },
      { merge: true } // ✅ Prevent overwriting existing fields
    );

    console.log("✅ Daily Progress Updated Successfully!");
  } catch (error) {
    console.error("❌ Error saving progress:", error);
  }
};