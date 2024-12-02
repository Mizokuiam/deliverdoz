import { getServerSession as getNextAuthServerSession } from "next-auth";
import { authConfig } from "./config";

export async function getServerSession() {
  try {
    const session = await getNextAuthServerSession(authConfig);
    return session;
  } catch (error) {
    console.error("[session] Failed to get server session:", error);
    return null;
  }
}