// Optional analytics is disabled until a deliberate, consent-aware integration
// is configured. No scene, authentication or persistence depends on Firebase.
const app=null,analytics=null;
if(typeof window!=='undefined'){delete window.__lunarFirebaseApp;delete window.__lunarFirebaseAnalytics;}
export {app,analytics};
