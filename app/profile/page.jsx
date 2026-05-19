"use client";

import React, { useState, useEffect } from "react";
import { Theme } from "@/components/Theme";
import { auth, db } from "@/config/firebase";
import { updateProfile, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";
import { FaEdit, FaCheck, FaSignOutAlt, FaCamera, FaCrown } from "react-icons/fa";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);

  // Replace this with your actual email to identify yourself as the Developer
  const ADMIN_EMAIL = "your-email@example.com"; 

  useEffect(() => {
    const fetchFirestoreData = async () => {
      if (status === "unauthenticated") {
        router.push("/signin");
      } else if (status === "authenticated" && session?.user) {
        try {
          // Use session.user.id (or email as fallback) to find the doc
          const identifier = session.user.id || session.user.email;
          const userDoc = await getDoc(doc(db, "users", identifier));
          
          setUserData({
            ...session.user,
            ...(userDoc.exists() ? userDoc.data() : {}),
          });
          setNewName(session.user.name || userDoc.data()?.fullName || "");
        } catch (error) {
          console.error("Error fetching user doc:", error);
          setUserData(session.user);
        }
      }
    };

    fetchFirestoreData();
  }, [session, status, router]);

  const handleUpdateName = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    try {
      // 1. Update Firebase Auth (if available)
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: newName,
        });
      }

      // 2. Update Firestore
      const identifier = session?.user?.id || session?.user?.email;
      const userRef = doc(db, "users", identifier);
      
      await updateDoc(userRef, {
        fullName: newName,
        displayName: newName // Updating both to be safe
      });

      // 3. Update Local State
      setUserData((prev) => ({ ...prev, name: newName, fullName: newName }));
      setIsEditing(false);
      alert("Name updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update name. Ensure you are logged in correctly.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth);
      await nextAuthSignOut({ callbackUrl: "/signin" });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: Theme.LightPurple }}></div>
      </div>
    );
  }

  // Logic to determine role
  const isDeveloper = userData?.email === ADMIN_EMAIL;

  return (
    <main className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-xl mx-auto">
        
        <section className="bg-[#FFFFFA] rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          
          <div className="h-32 w-full" style={{ backgroundColor: isDeveloper ? "#1e293b" : Theme.LightPurple }}></div>

          <div className="px-8 pb-10">
            <div className="relative -mt-16 mb-6 flex justify-center">
              <div className="relative">
                <img
                  src={userData?.image || `https://ui-avatars.com/api/?name=${userData?.name || "User"}&background=random`}
                  alt="Profile"
                  className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-lg bg-slate-100"
                />
                {isDeveloper && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-2 rounded-full shadow-lg">
                    <FaCrown size={14} />
                  </div>
                )}
              </div>
            </div>

            <div className="text-center space-y-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                  {isDeveloper ? "System Creator" : "Account Member"}
                </p>
                
                {isEditing ? (
                  <div className="flex flex-col items-center gap-3">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full max-w-sm px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-400/50 text-center text-xl font-bold text-slate-800"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleUpdateName}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-all disabled:opacity-50"
                      >
                        <FaCheck /> {saving ? "Saving..." : "Confirm"}
                      </button>
                      <button
                        onClick={() => { setIsEditing(false); setNewName(userData?.name || ""); }}
                        className="px-6 py-2 bg-slate-100 text-slate-600 rounded-lg font-bold hover:bg-slate-200 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <h2 className="text-3xl font-black text-slate-900">
                      {userData?.name || userData?.fullName || "User"}
                    </h2>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="text-slate-300 hover:text-purple-500 transition-colors"
                    >
                      <FaEdit size={20} />
                    </button>
                  </div>
                )}
                <p className="text-slate-500 font-medium mt-1">{userData?.email}</p>
              </div>

              <div className="h-px bg-slate-100 w-full"></div>

              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl ${isDeveloper ? 'bg-slate-900 text-white' : 'bg-slate-50'}`}>
                  <p className={`text-[10px] font-bold uppercase ${isDeveloper ? 'text-slate-400' : 'text-slate-400'}`}>Role</p>
                  <p className="font-black hover:text-purple-600">{isDeveloper ? "Developer" : "Member"}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Status</p>
                  <p className="text-slate-800 font-black hover:text-green-700">Verified</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-4 rounded-2xl border-2 border-slate-400  text-slate-900 font-bold flex items-center justify-center gap-3 hover:bg-red-70 hover:border-red-300 hover:text-red-500 transition-all mt-6"
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;