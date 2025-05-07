import * as AuthSession from "expo-auth-session";

const CLIENT_ID =
  "25396887236-rm6mrqsost58lvr6kqjnr7uhi8k8attt.apps.googleusercontent.com"; // 🔁 Replace with yours if different
const REDIRECT_URI = AuthSession.makeRedirectUri();

const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
];

export async function signInWithGoogle() {
  const authUrl =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    `?client_id=${CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=token` +
    `&scope=${encodeURIComponent(SCOPES.join(" "))}`;

  const result = await AuthSession.startAsync({ authUrl });
  return result;
}
