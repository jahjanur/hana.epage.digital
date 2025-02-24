import { useEffect } from "react";
import { messaging, getToken, VAPID_KEY } from "../../firebase-config";
import { onMessage } from "firebase/messaging";

const requestNotificationPermission = async () => {
  console.log("🔔 Requesting Notification Permission...");

  const permission = await Notification.requestPermission();
  console.log("🔔 Notification Permission:", permission);

  if (permission === "granted") {
    console.log("✅ Notification permission granted.");

    try {
      const token = await getToken(messaging, { vapidKey: VAPID_KEY });
      if (token) {
        console.log("🔑 FCM Token:", token);
      } else {
        console.log("⚠️ No registration token available.");
      }
    } catch (error) {
      console.error("❌ Error getting FCM token:", error);
    }
  } else {
    console.log("❌ Notification permission denied.");
  }
};

const Notifications = () => {
  useEffect(() => {
    requestNotificationPermission();

    // ✅ Ensure Foreground Notifications Work
    onMessage(messaging, (payload) => {
      console.log("🔔 Received foreground notification:", payload);

      if (!payload.notification) {
        console.warn("⚠️ Received payload with no notification:", payload);
        return;
      }

      const { title, body } = payload.notification;

      // ✅ Ensure Safe Handling
      new Notification(title ?? "New Notification", {
        body: body ?? "You have a new message",
        icon: "/icon.png",
      });
    });
  }, []);

  return null;
};

export default Notifications;