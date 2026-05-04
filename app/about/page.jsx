import React from 'react';
import { Theme } from "@/components/Theme";
import Link from "next/link";

const AboutPage = () => {
  // Mock array for core values grid
  const coreValues = [
    { 
      id: 1, 
      title: "Inclusivity", 
      desc: "We provide a safe haven for students from all backgrounds to ask 'stupid' questions and grow together." 
    },
    { 
      id: 2, 
      title: "Hands-on Learning", 
      desc: "Theory is good, but building is better. We focus on real-world projects that solve actual problems." 
    },
    { 
      id: 3, 
      title: "Community First", 
      desc: "Tech can be lonely. We believe in the power of peer-to-peer mentorship and collaborative coding." 
    },
  ];

  return (
    <main className="relative min-h-dvh overflow-x-hidden font-sans">
      {/* Background Image Layer */}
      <div 
        className="fixed top-0 left-0 w-full h-full bg-[url('/bg5.jpg')] bg-center bg-no-repeat bg-cover -z-10"
      ></div>

      {/* Hero-style About Section */}
      <section className="min-h-[70dvh] bg-black/70 flex items-center justify-center">
        <div className="text-white lg:w-2/3 mx-auto flex flex-col items-center justify-center gap-6 py-20 px-6 text-center">
          <h1 className="text-6xl font-black max-md:text-4xl uppercase tracking-tighter">
            Our Story
          </h1>
          <div style={{ backgroundColor: Theme.warmYellow }} className="h-2 w-32 rounded-full mb-4"></div>
          
          <p className="text-2xl font-light max-md:text-lg leading-relaxed max-w-4xl">
            Tech Community was born out of a simple observation: <span style={{ color: Theme.warmYellow }}
             className="font-bold italic">Learning to code alone is hard. </span> 
            We started as a small group of students from an <span className='font-semibold italic'>Early Code Institution </span> 
             helping each other debug HTML amd CSS and has since grown into a global hub for the next generation of developers.
          </p>
        </div>
      </section>

      {/* Main Content Section - Light Theme */}
      <section className="py-24 bg-white/70 backdrop-blur-sm">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">
                Bridging the gap between <br />
                <span className="italic">Classroom</span> and <span style={{ color: Theme.DeepRoyalPurple }}>Career</span>.
              </h2>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Most bootcamps and tutorials give you the "what," but they rarely give you the "who." 
                We provide the community support you need to push through the moments when you want to quit. 
                Whether it's your first "Hello World" or your first React App, we're here to celebrate every win.
              </p>
              <Link 
                href="https://www.earlycode.net/" 
                style={{ backgroundColor: Theme.warmYellow }} 
                className="inline-block px-10 py-4 rounded-full text-black font-bold shadow-lg hover:-translate-y-1 transition-transform"
              >
                Join the Movement
              </Link> 
            </div>
            <div className="aspect-square bg-slate-100 rounded-[3rem] border-8 border-white shadow-xl overflow-hidden">
               <img 
                src="/bg2.jpg" 
                alt="Community meeting" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid - Loop through mock array */}
      <section className="py-24 bg-slate-100/80 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-black text-center mb-12 text-slate-900 uppercase font-serif">What We Stand For</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value) => (
              <div 
                key={value.id} 
                style={{ backgroundColor: Theme.LightPurple }}
                className="p-10 rounded-[2.5rem] border border-white/20 shadow-sm hover:shadow-xl transition-all"
              >
                <h4 className="text-2xl font-black mb-4 text-black italic">{value.title}</h4>
                <p className="text-white font-medium leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-200 shadow-sm text-center">
        <p style={{ color: Theme.DeepRoyalPurple }} className="text-black font-bold font-mono uppercase tracking-widest text-xs">
          Tech Community © 2026 — Built by Destiny, for students.
        </p>
      </footer>
    </main>
  );
};

export default AboutPage;