// Legacy anonymous Supabase syncing is disabled. Browser-wide publishable keys
// cannot identify the owner of private saved views or commission applications.
// Commission/company records use the server /api routes; scene views/settings
// remain in browser-local storage (or the offline SQLite launcher) until a
// per-user authenticated sync API is implemented. No network request is made.
export const LunarSupabase = null;
if (typeof window !== 'undefined') delete window.LunarSupabase;
