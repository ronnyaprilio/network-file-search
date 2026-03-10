import { auth } from "@/auth"
import { redirect } from "next/navigation"
import LogoutButton from "../components/LogoutButton"
import SyncButton from "../components/SyncButton"

export default async function Dashboard() {
  const session = await auth()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-slate-950 text-emerald-100 flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-8">Welcome {session.user?.name}</h1>
      <div className="flex flex-col items-center gap-4">
        <SyncButton />
        <LogoutButton />
      </div>
    </div>
  )
}