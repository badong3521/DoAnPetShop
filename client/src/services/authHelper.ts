// // authHelper.ts
// import { SESSION_USER_STORAGE_KEY, useSessionStore } from "src/stores/session";
// import { SESSION_TOKENS_STORAGE_KEY } from "src/stores/session";

// export function clearSession() {
//   localStorage.removeItem(SESSION_USER_STORAGE_KEY);
//   localStorage.removeItem(SESSION_TOKENS_STORAGE_KEY);
//   useSessionStore.getState().signOut();
// }

// export function getStoredTokens() {
//   const storedTokens = localStorage.getItem(SESSION_TOKENS_STORAGE_KEY);
//   return storedTokens ? JSON.parse(storedTokens) : null;
// }