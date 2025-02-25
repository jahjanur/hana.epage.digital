import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // ✅ Firestore Import
import { getMessaging, getToken } from "firebase/messaging";

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyhXfYXNGwP3wjbxkBZ6c_uFYg4DxjK3c",
  authDomain: "hana-epage-digital.firebaseapp.com",
  projectId: "hana-epage-digital",
  storageBucket: "hana-epage-digital.appspot.com",
  messagingSenderId: "140977165040",
  appId: "1:140977165040:web:34d93bb32fdbfd52202835",
  measurementId: "G-EWEE6DMB0S"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Firestore Setup (for tracking user Quran & prayer progress)
const db = getFirestore(app);

// ✅ Firebase Messaging (Notifications)
const messaging = getMessaging(app);

// ✅ VAPID Key (For Web Push Notifications)
export const VAPID_KEY = "BOJ499dPvHi1U-P_CuKL9gFIS8mhl099CKv6jNMLZDuE3ay3U068BBltliaMedozGoYAJnakLq1sTj3NFMB6vbU";

// ✅ Register Service Worker Before Requesting Token
navigator.serviceWorker.ready
  .then((registration) => {
    return getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });
  })
  .then((token) => {
    if (token) {
      console.log("🔑 FCM Token:", token);
    } else {
      console.log("⚠️ No registration token available.");
    }
  })
  .catch((err) => {
    console.error("❌ Error getting FCM token:", err);
  });

// ✅ Export Firestore (`db`) and Messaging (`messaging`)
export { db, messaging, getToken };