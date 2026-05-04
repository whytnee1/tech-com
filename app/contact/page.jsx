import React from 'react';
import { Theme } from "@/components/Theme";
import Link from "next/link";

const ContactPage = () => {
  // Mock array for the 3-column contact info grid
  const contactDetails = [
    {
      id: 1,
      title: "Email Us",
      value: "hello@techcommunity.com",
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

  return (
    <main className="relative min-h-dvh overflow-x-hidden font-sans">
      {/* Background Image Layer */}
      <div 
        className="fixed top-0 left-0 w-full h-full bg-[url('/contact.jpg')] bg-center bg-no-repeat bg-cover -z-10"
      ></div>

      {/* Hero Header - Dark Overlay */}
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

      {/* Contact Form Section - Light Theme */}
      <section className="py-20 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-slate-50 p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 ml-2">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-slate-300 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700 ml-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-slate-300 transition-all"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 ml-2">Your Message</label>
                <textarea 
                  rows={5}
                  placeholder="How can our community help you?"
                  className="w-full px-6 py-4 rounded-3xl bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-slate-300 transition-all resize-none"
                />
              </div>

              <button 
                type="submit"
                style={{ backgroundColor: Theme.warmYellow }}
                className="w-full py-5 rounded-2xl text-black font-black text-xl shadow-lg hover:-translate-y-1 transition-all uppercase tracking-tight"
              >
                Send Message
              </button>
              
            </form>
          </div>
        </div>
      </section>

      {/* Info Grid - Loop through mock array */}
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
                <p className="text-xl font-bold text-black mb-1">{info.value}</p>
                <p className="text-sm text-white/80 font-medium italic">{info.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white text-center border-t border-slate-200">
        <p style={{ color: Theme.DeepRoyalPurple }} className="text-slate-400 font-bold uppercase tracking-widest text-lg italic">
          © 2026 Tech Community — Reach out and let's build together.
        </p>
      </footer>
    </main>
  );
};

export default ContactPage;