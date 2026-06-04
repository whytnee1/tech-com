"use client";

import Link from "next/link";
import { FaShieldHalved, FaLock, FaUserShield, FaCookieBite, FaTerminal } from "react-icons/fa6";

export default function PrivacyPolicyLayout() {
  const lastUpdated = "June 4, 2026";

  const policySections = [
    {
      icon: <FaTerminal className="text-[#4B0082] text-xl" />,
      title: "1. Data Compilation (What We Collect)",
      content: "We ingest data structures required to deliver high-quality platform features. This includes account profile arrays (name, email, profile metadata from authentication streams) and tech tip submissions you compile, execute, or publish within our environment."
    },
    {
      icon: <FaLock className="text-[#4B0082] text-xl" />,
      title: "2. Execution & Processing (How We Use Data)",
      content: "Your datasets are processed to initialize secure user sessions, maintain internal tip repositories, run algorithmic content distribution, and establish communications metrics regarding protocol changes or direct support requests."
    },
    {
      icon: <FaCookieBite className="text-[#4B0082] text-xl" />,
      title: "3. Telemetry & State Management (Cookies)",
      content: "We implement secure tracking arrays and persistent validation states (JWT, session caching, local storage keys) to capture runtime layout variables, minimize system handshake overhead, and optimize client-side rendering architecture."
    },
    {
      icon: <FaUserShield className="text-[#4B0082] text-xl" />,
      title: "4. Node Distribution (Data Sharing)",
      content: "LetsCode values data integrity. Your user clusters are never sold to external third-party data brokers. Distribution endpoints are limited strictly to trusted system cloud runtimes and integrated modern authentication infrastructure nodes."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden font-sans text-gray-800">
      
      {/* Terminal Styling Header Banner */}
      <div className="bg-[#4B0082] px-6 py-8 text-white relative overflow-hidden">
        <div className="absolute top-2 left-4 flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 opacity-80"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></span>
          <span className="w-3 h-3 rounded-full bg-green-500 opacity-80"></span>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
          <div className="flex items-center gap-3">
            <FaShieldHalved className="text-3xl text-white" />
            <div>
              <h1 className="text-2xl font-serif font-bold tracking-tight">PRIVACY_PROTOCOL.md</h1>
              <p className="text-xs text-purple-200 mt-1 font-mono">System Security Level: Active</p>
            </div>
          </div>
          <div className="text-left sm:text-right font-mono text-xs text-purple-200">
            <p>Version: 2.0.26</p>
            <p>Last Modified: {lastUpdated}</p>
          </div>
        </div>
      </div>

      {/* Content Body Layout */}
      <div className="p-6 sm:p-10 space-y-8">
        
        <section className="border-b border-gray-100 pb-6">
          <h2 className="text-xl font-serif font-bold text-[#2E003E] mb-3">Root Introduction</h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Welcome to <span className="font-semibold text-[#4B0082]">LetsCode</span>. 
            Our architecture processes user variables with high-grade security integrity. This Privacy Protocol 
            outlines the algorithmic standards applied to compile, process, and secure user data assets within our environment.
          </p>
        </section>

        {/* Map through protocol layout streams dynamically */}
        <div className="grid gap-6">
          {policySections.map((section, index) => (
            <div 
              key={index} 
              className="p-5 border border-gray-100 rounded-lg hover:border-purple-200 hover:bg-purple-50/10 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                {section.icon}
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#2E003E]">
                  {section.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed pl-8">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Security & Contacts Segment Block */}
        <section className="bg-gray-50 rounded-lg p-6 border border-gray-100 mt-8">
          <h2 className="text-lg font-serif font-bold text-[#2E003E] mb-2">5. Encryption & Security Stack</h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
            All payload transits are handled via end-to-end encrypted tunnels (HTTPS) and stored using resilient hashing standards. However, no digital transport over global root hubs features absolute 100% failproof protection.
          </p>
          
          <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">Inquiries Node</p>
              <p className="text-sm font-semibold text-[#4B0082]">root@letscode.com</p>
            </div>
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider px-4 py-2 border rounded-sm bg-[#4B0082] text-white border-[#4B0082] transition-transform duration-300 hover:scale-105"
            >
              Open Communication Link
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

