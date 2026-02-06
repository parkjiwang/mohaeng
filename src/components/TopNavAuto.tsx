import TopNav from "@/components/TopNav";
import { cookies } from "next/headers";

export default function TopNavAuto() {
  const store = cookies();

  let loggedIn = false;

  try {
    loggedIn = store.get("moheng_logged_in")?.value === "1";
  } catch {
    loggedIn = false;
  }

  return <TopNav variant={loggedIn ? "in" : "out"} />;
}

