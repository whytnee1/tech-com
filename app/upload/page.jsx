import { redirect } from "next/navigation";
import { auth } from "@/auth";
import UploadClient from "./upload";

export default async function Upload() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return (
    <main>
      <UploadClient />
    </main>
  );
}