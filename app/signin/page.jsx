"use client";

import React, { useState, useEffect } from 'react';
import { Theme } from "@/components/Theme";
import Link from "next/link";
import { signIn, signOut } from 'next-auth/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { auth } from '@/config/firebase'; 
import { sendPasswordResetEmail } from "firebase/auth";

const SignInPage = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [resetSent, setResetSent] = useState(false);

  // Clear stale local sessions on mount if it exceeds 24 hours
  useEffect(() => {
    const lastLogin = localStorage.getItem("last_login_timestamp");
    if (lastLogin) {
      const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      const timeElapsed = Date.now() - parseInt(lastLogin, 10);

      if (timeElapsed > twentyFourHours) {
        localStorage.removeItem("last_login_timestamp");
        signOut({ redirect: false }); // Force NextAuth to clean up client context
        setErrorMsg("Your session expired after 24 hours. Please sign in again.");
      }
    }
  }, []);

  // Validation Schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  // Handle Password Reset
  const handleForgotPassword = async () => {
    if (!formik.values.email) {
      setErrorMsg("Please enter your email address first to reset your password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, formik.values.email);
      setResetSent(true);
      setErrorMsg("");
      alert("Password reset email sent! Check your inbox.");
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to send reset email. Check if the email is correct.");
    }
  };

  // Formik Hook
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setErrorMsg("");
      try {
        const res = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (res?.error) {
          setErrorMsg("Invalid credentials. Please check your email and password.");
          console.error("Login failed:", res.error);
        } else {
          // Set timestamp for 24-hour expiry evaluation
          localStorage.setItem("last_login_timestamp", Date.now().toString());
          router.push('/tip');
        }
      } catch (error) {
        setErrorMsg("An unexpected error occurred. Please try again.");
        console.error("An unexpected error occurred:", error);
      }
    },
  });

  const communityStats = [
    { id: 1, label: "Active Members", value: "10,000+" },
    { id: 2, label: "Projects Built", value: "500+" },
    { id: 3, label: "Countries", value: "45+" },
  ];

  return (
    <main className="relative min-h-dvh flex flex-col items-center py-20 px-6 overflow-hidden">
      
      {/* Blurry Background */}
      <div 
        className="absolute inset-0 -z-10 bg-[url('/bg1.jpg')] bg-center bg-no-repeat bg-cover bg-fixed blur-md scale-110"
        aria-hidden="true"
      />

      {/* Sign-In Card */}
      <section className="w-full max-w-md bg-white/90 backdrop-blur-lg p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/20 mb-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 italic">Sign In</h1>
          <p className="text-slate-600 font-light mt-2">To Continue your learning journey</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Error Message Display */}
          {errorMsg && (
            <div className="p-3 text-xs bg-red-50 text-red-600 border border-red-100 rounded-xl font-bold text-center">
              {errorMsg}
            </div>
          )}

          {/* Google Sign In */}
          <button 
            type="button"
            onClick={async () => {
              localStorage.setItem("last_login_timestamp", Date.now().toString());
              await signIn("google", { callbackUrl: "/tip" });
            }}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-3.5 rounded-2xl font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <div className="flex items-center gap-4 my-4">
            <div className="h-[1px] bg-slate-200 flex-1"></div>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">or</span>
            <div className="h-[1px] bg-slate-200 flex-1"></div>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1">
              <input 
                name="email"
                type="email" 
                placeholder="Email" 
                {...formik.getFieldProps('email')}
                className={`w-full px-6 py-4 rounded-2xl bg-slate-100/80 shadow border outline-none transition-all ${
                  formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-transparent focus:bg-white focus:border-slate-300'
                }`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-[10px] ml-2 font-bold italic">{formik.errors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <input 
                name="password"
                type="password" 
                placeholder="Password" 
                {...formik.getFieldProps('password')}
                className={`w-full px-6 py-4 rounded-2xl bg-slate-100/80 shadow border outline-none transition-all ${
                  formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-transparent focus:bg-white focus:border-slate-300'
                }`}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-[10px] ml-2 font-bold italic">{formik.errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end pr-2">
              <button 
                type="button" 
                onClick={handleForgotPassword}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <button 
              type="submit"
              disabled={formik.isSubmitting}
              style={{ backgroundColor: Theme.LightPurple }} 
              className="w-full py-4 rounded-2xl text-white font-black text-lg mt-4 shadow-xl hover:-translate-y-1 transition-transform active:scale-95 disabled:opacity-50"
            >
              {formik.isSubmitting ? "Signing in..." : "Login"}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 mt-8 text-sm">
          New here? <Link href="/signup" className="font-bold text-slate-900 underline">Create Account</Link>
        </p>
      </section>

      {/* Grid Stats */}
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