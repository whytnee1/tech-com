"use client";
import React, { useState } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { Theme } from "@/components/Theme";
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Firebase Imports
import { auth, db } from '@/config/firebase'; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";

export default function SignupClient() {
  const router = useRouter();
  const [isCreated, setIsCreated] = useState(false);

  const iv = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const valSchema = Yup.object({
    fullName: Yup.string()
      .min(3, "Name is too short")
      .required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], "Passwords must match")
      .required("Confirm your password")
  });

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      // 1. DUPLICATE CHECK: Query Firestore to see if the email already exists
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", values.email.toLowerCase()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If found, stop the process and show error on the email field
        setFieldError("email", "This email is already registered to another account.");
        setSubmitting(false);
        return;
      }

      // 2. Create account in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        values.email, 
        values.password
      );
      
      const user = userCredential.user;

      // 3. Update Profile
      await updateProfile(user, {
        displayName: values.fullName
      });

      // 4. Save to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: values.fullName,
        email: values.email.toLowerCase(), // Store in lowercase for easier searching
        createdAt: new Date().toISOString(),
        role: "developer" 
      });

      // SUCCESS MESSAGE
      setIsCreated(true); 
      
      setTimeout(() => {
        router.push('/signin'); 
      }, 3000);
      
    } catch (error) {
      console.error("Signup Error:", error.code);
      
      // Fallback for Firebase Auth's internal duplicate check
      if (error.code === 'auth/email-already-in-use') {
        setFieldError("email", "Email already in use. Please try logging in.");
      } else {
        alert("Registration failed: " + error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl shadow-slate-300/50 border border-slate-100 overflow-hidden relative">
      
      {/* Success Notification Overlay */}
      {isCreated && (
        <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-10 text-center animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <FaCheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2 leading-tight">ACCOUNT CREATED SUCCESSFULLY</h2>
          <p className="text-slate-500 font-medium">Redirecting you to the login page...</p>
        </div>
      )}

      {/* Header */}
      <div className="p-10 pb-2 text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FaUserPlus size={28} style={{ color: Theme.LightPurple }} />
        </div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">
          Create <span style={{ color: Theme.LightPurple}}>Account</span>
        </h1>
        <p className="text-slate-600 font-medium">Join the community and start coding.</p>
      </div>

      <Formik
        initialValues={iv}
        validationSchema={valSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="p-10 flex flex-col gap-5">
            
            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-2 font-bold text-slate-700 ml-1 text-sm">
                <FaUser size={14} style={{ color: Theme.LightPurple }} /> Full Name
              </label>
              <Field
                name="fullName"
                placeholder="John doe"
                className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border transition-all text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 ${
                  errors.fullName && touched.fullName ? 'border-red-400' : 'border-slate-200'
                }`}
              />
              <ErrorMessage name="fullName" component="div" className="text-red-500 text-xs font-semibold ml-2" />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-2 font-bold text-slate-700 ml-1 text-sm">
                <FaEnvelope size={14} style={{ color: Theme.LightPurple }} /> Email Address
              </label>
              <Field
                name="email"
                type="email"
                placeholder="example@email.com"
                className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border transition-all text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 ${
                  errors.email && touched.email ? 'border-red-400' : 'border-slate-200'
                }`}
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs font-semibold ml-2" />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-2 font-bold text-slate-700 ml-1 text-sm">
                <FaLock size={14} style={{ color: Theme.LightPurple }} /> Password
              </label>
              <Field
                name="password"
                type="password"
                placeholder="••••••••"
                className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border transition-all text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 ${
                  errors.password && touched.password ? 'border-red-400' : 'border-slate-200'
                }`}
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs font-semibold ml-2" />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label className="flex items-center gap-2 font-bold text-slate-700 ml-1 text-sm">
                <FaLock size={14} style={{ color: Theme.LightPurple }} /> Confirm Password
              </label>
              <Field
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border transition-all text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400/50 ${
                  errors.confirmPassword && touched.confirmPassword ? 'border-red-400' : 'border-slate-200'
                }`}
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs font-semibold ml-2" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isCreated}
              style={{ backgroundColor: Theme.LightPurple }}
              className="mt-4 w-full md:w-1/2 py-5 rounded-2xl text-white font-black text-xl flex items-center justify-center gap-3 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? "Checking..." : "Sign Up"}
              <FaArrowRight size={18} />
            </button>

            <p className="text-center text-slate-700 text-sm font-medium mt-2">
              Already have an account?{" "}
              <Link href="/signin" className="font-bold text-black hover:underline underline-offset-4">
                Log In
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}