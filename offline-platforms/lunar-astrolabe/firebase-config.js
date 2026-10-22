// Firebase Client SDK Integration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_ql1vL73MYUTjad4dhIzqc3Rkm3M7xac",
  authDomain: "lunarparadox-42141.firebaseapp.com",
  projectId: "lunarparadox-42141",
  storageBucket: "lunarparadox-42141.firebasestorage.app",
  messagingSenderId: "983034659672",
  appId: "1:983034659672:web:4fc578255e1d1be8999b2d",
  measurementId: "G-L8SLD6B5WR"
};

const app = initializeApp(firebaseConfig);

let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
      window.__lunarFirebaseAnalytics = analytics;
    }
  }).catch(() => {});
}

window.__lunarFirebaseApp = app;

export { app, analytics };
