import React from 'react';
import { Theme } from "@/components/Theme";
import Link from "next/link";
import { signIn } from '@/auth';

const SignInPage = () => {
  // Mock array for the 3-column grid
  const communityStats = [
    { id: 1, label: "Active Members", value: "10,000+" },
    { id: 2, label: "Projects Built", value: "500+" },
    { id: 3, label: "Countries", value: "45+" },
  ];

  return (
    <main className="min-h-dvh bg-[url('/bg1.jpg')] bg-center bg-no-repeat bg-cover 
    bg-fixed flex flex-col items-center py-20 px-6">
      
      {/* Sign-In Card Container */}
      <section className="w-full max-w-md bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/20 mb-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 italic">Sign In</h1>
          <p className="text-slate-600 font-light mt-2">To Continue your learning journey</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Google Sign In Option */}
          
          <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-3.5 rounded-2xl font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>
    </form>

          <div className="flex items-center gap-4 my-4">
            <div className="h-[1px] bg-slate-200 flex-1"></div>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">or</span>
            <div className="h-[1px] bg-slate-200 flex-1"></div>
          </div>

          {/* Email/Password Inputs */}
          <div className="space-y-3">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full px-6 py-4 rounded-2xl bg-slate-100/80 shadow border border-transparent focus:bg-white focus:border-slate-300 outline-none transition-all"
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full px-6 py-4 rounded-2xl bg-slate-100/80 shadow border border-transparent focus:bg-white focus:border-slate-300 outline-none transition-all"
            />
          </div>

          <button 
            style={{ backgroundColor: Theme.LightPurple }} 
            className="w-full py-4 rounded-2xl text-white font-black text-lg mt-4 shadow-xl hover:-translate-y-1 transition-transform"
          >
            Login
          </button>
        </div>

        <p className="text-center text-slate-500 mt-8 text-sm">
          New here? <Link href="/" className="font-bold text-slate-900 underline">Create Account</Link>
        </p>
      </section>

      {/* 3-Column Grid Loop */}
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {communityStats.map((item) => (
          <div 
            key={item.id} 
            className="bg-black/70 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 text-center"
          >
            <h2 
              style={{ color: Theme.warmYellow }} 
              className="text-3xl font-black mb-1"
            >
              {item.value}
            </h2>
            <p className="text-white/60 font-light uppercase tracking-widest text-xs">
              {item.label}
            </p>
          </div>
        ))}
      </section>

    </main>
  );
}

export default SignInPage;