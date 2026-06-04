"use client";

import Link from "next/link";
import { FaScaleBalanced, FaCodeBranch, FaKey, FaBan, FaServer, FaTerminal } from "react-icons/fa6";

export default function TermsOfServiceLayout() {
  const lastUpdated = "June 4, 2026";

  const termsSections = [
    {
      icon: <FaCodeBranch className="text-[#4B0082] text-xl" />,
      title: "1. Compilation License & Core Scope",
      content: "By executing user instances on LetsCode, you are granted a non-exclusive, non-transferable runtime access license. All compiled materials, platform arrays, and design layouts are property architecture nodes protected by global digital system frameworks."
    },
    {
      icon: <FaKey className="text-[#4B0082] text-xl" />,
      title: "2. Account Node Credentials & Authentication",
      content: "Users are responsible for safeguarding local validation states, authorization cookies, and database session secrets. Any data leakage or automated requests triggering from unauthorized deployments are the structural responsibility of the node operator."
    },
    {
      icon: <FaBan className="text-[#4B0082] text-xl" />,
      title: "3. Prohibited Syntax & System Abuse",
      content: "You may not run stress tests, packet flooding operations, reverse engineering sequences, or upload malicious payload scripts into our terminal paths. Violation of these runtime parameters triggers an immediate and permanent session cancellation."
    },
    {
      icon: <FaServer className="text-[#4B0082] text-xl" />,
      title: "4. Infrastructure Availability & State Fluctuations",
      content: "While we aim for maximum network uptime metrics, our cloud runtimes are provided on an 'AS-IS' and 'AS-AVAILABLE' paradigm. LetsCode provides no warranty buffers for data payload losses or runtime service disruptions during maintenance loops."
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
            <FaScaleBalanced className="text-3xl text-white" />
            <div>
              <h1 className="text-2xl font-serif font-bold tracking-tight">TERMS_OF_SERVICE.md</h1>
              <p className="text-xs text-purple-200 mt-1 font-mono">System Protocol: Legal Validation Active</p>
            </div>
          </div>
          <div className="text-left sm:text-right font-mono text-xs text-purple-200">
            <p>Version: 1.0.26</p>
            <p>Last Modified: {lastUpdated}</p>
          </div>
        </div>
      </div>

      {/* Content Body Layout */}
      <div className="p-6 sm:p-10 space-y-8">
        
        <section className="border-b border-gray-100 pb-6">
          <h2 className="text-xl font-serif font-bold text-[#2E003E] mb-3">System Framework Overview</h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            These terms govern your runtime handshake initialization with the <span className="font-semibold text-[#4B0082]">LetsCode</span> framework ecosystem. 
            By accessing our server routes, endpoints, or data nodes, you confirm validation agreement to these baseline system operation protocols.
          </p>
        </section>

        {/* Dynamic Mapping Matrix for Terms Content */}
        <div className="grid gap-6">
          {termsSections.map((section, index) => (
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

        {/* Contractual Termination & Contact Node */}
        <section className="bg-gray-50 rounded-lg p-6 border border-gray-100 mt-8">
          <h2 className="text-lg font-serif font-bold text-[#2E003E] mb-2">5. Structural Disclaimers & Limits</h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
            LetsCode reserves the unilateral authority to adjust, re-compile, or deprecate any portion of these architectural guidelines at any time by modifying the version parameter metadata inside this protocol script.
          </p>
          
          <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">Compliance Operations</p>
              <p className="text-sm font-semibold text-[#4B0082]">legal@letscode.com</p>
            </div>
            {/* <Link 
              href="/contact" 
              className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider px-4 py-2 border rounded-sm bg-[#4B0082] text-white border-[#4B0082] transition-transform duration-300 hover:scale-105"
            >
              Establish Connection
            </Link> */}
          </div>
        </section>

      </div>
    </div>
  );
}