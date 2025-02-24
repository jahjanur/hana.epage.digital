importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCyhXfYXNGwP3wjbxkBZ6c_uFYg4DxjK3c",
  authDomain: "hana-epage-digital.firebaseapp.com",
  projectId: "hana-epage-digital",
  storageBucket: "hana-epage-digital.appspot.com",
  messagingSenderId: "140977165040",
  appId: "1:140977165040:web:34d93bb32fdbfd52202835",
  measurementId: "G-EWEE6DMB0S"
});

const messaging = firebase.messaging();

// ✅ Log when the Service Worker is running
self.addEventListener('install', (event) => {
  console.log("🚀 Service Worker Installed");
});

self.addEventListener('activate', (event) => {
  console.log("✅ Service Worker Activated");
});

// ✅ Handle Background Messages
messaging.onBackgroundMessage((payload) => {
  console.log("🔔 Received background notification:", payload);

  if (!payload.notification) {
    console.warn("⚠️ No notification object in payload.");
    return;
  }

  const { title, body } = payload.notification;

  self.registration.showNotification(title, {
    body,
    icon: "/icon.png"
  });
});