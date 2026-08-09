import { redirect } from "next/navigation";

// The old /admin/settings is now covered by /admin/content/site-settings
export default function OldSettingsPage() {
  redirect("/admin/content/site-settings");
}
