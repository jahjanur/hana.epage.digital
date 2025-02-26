import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, orderBy, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getMessaging, getToken, Messaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCyhXfYXNGwP3wjbxkBZ6c_uFYg4DxjK3c",
  authDomain: "hana-epage-digital.firebaseapp.com",
  projectId: "hana-epage-digital",
  storageBucket: "hana-epage-digital.firebasestorage.app",
  messagingSenderId: "140977165040",
  appId: "1:140977165040:web:34d93bb32fdbfd52202835",
  measurementId: "G-EWEE6DMB0S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
provider.setCustomParameters({
  prompt: 'select_account',
  // Add these parameters for better mobile handling
  mobile: 'true',
  iosBundle: 'com.yourapp.id', // Replace with your app's bundle ID if you have one
});

// Set persistence to LOCAL
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Auth persistence error:", error);
  });

// Initialize Messaging
let messaging: Messaging | null = null;

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  messaging = getMessaging(app);
  
  navigator.serviceWorker.ready
    .then((registration) => {
      if (messaging) {
        return getToken(messaging, {
          vapidKey: "BOJ499dPvHi1U-P_CuKL9gFIS8mhl099CKv6jNMLZDuE3ay3U068BBltliaMedozGoYAJnakLq1sTj3NFMB6vbU",
          serviceWorkerRegistration: registration,
        });
      }
      return null;
    })
    .then((token) => {
      if (token) {
        console.log("FCM Token:", token);
      }
    })
    .catch((err) => {
      console.error("Error getting FCM token:", err);
    });
}

export { app, db, auth, provider, messaging };