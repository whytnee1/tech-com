"use client";
import React, { useState } from 'react';
import { Theme } from "@/components/Theme";
import { db } from '@/config/firebase'; // Ensure this path is correct
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { FiLoader, FiCheckCircle } from "react-icons/fi";

const ContactPage = () => {
  // State for form fields
  const [formData, setFormData] = useState({ fullName: "", email: "", message: "" });
  // State for error tracking
  const [errors, setErrors] = useState({});
  // State for submission handling
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactDetails = [
    {
      id: 1,
      title: "Email Us",
      value: "Techcom@gmail.com",
      subtext: "We respond within 24 hours."
    },
    {
      id: 2,
      title: "Our Contact",
      value: "[+234]-9053020238",
      subtext: "We are just a call away."
    },
    {
      id: 3,
      title: "Community",
      value: "@TechComm_Global",
      subtext: "Join the conversation on X."
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempErrors = {};

    // Validation Logic
    if (!formData.fullName.trim()) tempErrors.fullName = "Name is required";
    if (!formData.email.trim()) tempErrors.email = "Email is required";
    if (!formData.message.trim()) tempErrors.message = "Message cannot be empty";

    setErrors(tempErrors);

    // If no errors, proceed to Firebase
    if (Object.keys(tempErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await addDoc(collection(db, "contact-messages"), {
          ...formData,
          createdAt: serverTimestamp(),
          status: "unread" // Useful for your admin dashboard later
        });

        setSubmitted(true);
        setFormData({ fullName: "", email: "", message: "" }); // Clear form
      } catch (error) {
        console.error("Firebase Error:", error);
        alert("Something went wrong. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <main className="relative min-h-dvh overflow-x-hidden font-sans">
      <div 
        className="fixed top-0 left-0 w-full h-full bg-[url('/contact.jpg')] bg-center bg-no-repeat bg-cover -z-10"
      ></div>

      <section className="min-h-[40dvh] bg-black/75 flex items-center justify-center">
        <div className="text-white lg:w-2/3 mx-auto flex flex-col items-center justify-center gap-4 pt-10 px-6 text-center">
          <h1 className="text-6xl font-black max-md:text-4xl uppercase tracking-tighter">
            Get In Touch
          </h1>
          <div style={{ backgroundColor: Theme.warmYellow }} className="h-1.5 w-20 rounded-full"></div>
          <p className="text-xl font-light max-md:text-sm text-slate-300 italic">
            Have a question or want to partner with us? We're just a message away.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-slate-50 p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100">
            
            {submitted ? (
              <div className="text-center py-10 flex flex-col items-center">
                <FiCheckCircle size={60} className="text-green-500 mb-4" />
                <h2 className="text-3xl font-black mb-4">Message Sent!</h2>
                <p className="text-slate-500 max-w-xs mx-auto">
                  Thank you for reaching out. We would get back via email.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 font-bold text-slate-800 underline hover:text-black transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700 ml-2">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      disabled={isSubmitting}
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className={`w-full px-6 py-4 rounded-2xl bg-white border outline-none focus:ring-2 focus:ring-slate-300 transition-all ${errors.fullName ? 'border-red-500 ring-1 ring-red-200' : 'border-slate-200'}`}
                    />
                    {errors.fullName && <span className="text-xs text-red-500 font-bold ml-2 italic">{errors.fullName}*</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-700 ml-2">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full px-6 py-4 rounded-2xl bg-white border outline-none focus:ring-2 focus:ring-slate-300 transition-all ${errors.email ? 'border-red-500 ring-1 ring-red-200' : 'border-slate-200'}`}
                    />
                    {errors.email && <span className="text-xs text-red-500 font-bold ml-2 italic">{errors.email}*</span>}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 ml-2">Your Message</label>
                  <textarea 
                    rows={5}
                    placeholder="How can our community help you?"
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`w-full px-6 py-4 rounded-3xl bg-white border outline-none focus:ring-2 focus:ring-slate-300 transition-all resize-none ${errors.message ? 'border-red-500 ring-1 ring-red-200' : 'border-slate-200'}`}
                  />
                  {errors.message && <span className="text-xs text-red-500 font-bold ml-2 italic">{errors.message}*</span>}
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  style={{ backgroundColor: isSubmitting ? "#ccc" : Theme.warmYellow }}
                  className="w-full py-5 rounded-2xl text-black font-black text-xl shadow-lg hover:-translate-y-1 transition-all uppercase tracking-tight flex items-center justify-center gap-3 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader className="animate-spin" /> Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-100/80 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {contactDetails.map((info) => (
              <div 
                key={info.id}
                style={{ backgroundColor: Theme.LightPurple }}
                className="p-10 rounded-[2.5rem] border border-white/20 text-center shadow-sm group hover:shadow-xl transition-all"
              >
                <h4 className="text-xs font-black text-white/60 uppercase tracking-widest mb-2">{info.title}</h4>
                <p className="text-xl font-bold text-white mb-1">{info.value}</p>
                <p className="text-sm text-white/80 font-medium italic">{info.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 bg-white text-center border-t border-slate-200">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-lg italic">
          © 2026 Tech Community — Reach out and let's build together.
        </p>
      </footer>
    </main>
  );
};

export default ContactPage;