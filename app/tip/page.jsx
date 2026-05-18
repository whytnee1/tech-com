"use server"
import { auth } from "@/auth";
import TechTipsFeed from "./tip";

export default async function Tips() {
  const session = await auth()
  return (
    <main>
      <TechTipsFeed session={session}/>
    </main>
  )
}