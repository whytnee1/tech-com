// app/privacy/page.jsx
"use client";

// Use relative local paths to target components inside the same folder node
import PrivacyPolicyLayout from "./policy"; 

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <PrivacyPolicyLayout />
    </div>
  );
}