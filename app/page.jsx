import { Theme } from "@/components/Theme";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden">
      {/* Background Video Layer */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/bgvideo1.mp4" type="video/mp4" />
      </video>

      {/* Hero Section - Restored to your original dark design */}
      <section className="min-h-dvh bg-black/40">
        <div className="text-white lg:w-2/3 mx-auto flex flex-col items-center justify-center gap-10 lg:pt-20 pt-5 px-6">
          <h1 className="text-6xl font-black max-md:text-4xl">Let's Code</h1>
          <span
            style={{ color: Theme.warmYellow }}
            className="text-6xl font-black italic max-md:text-4xl max-md:ml-6"
          >
            With other communities...
          </span>

          <p className="text-xl font-light text-center max-md:text-sm">
            Welcome to Tech Community, a place where beginners and students come together
            to learn, and grow in the world of technology. Whether you’re just starting or
            exploring new skills, you’ll find support, and a community ready to help you succeed.
          </p>

          <div className="transition-transform duration-300 hover:-translate-y-3">
            <Link
              href={"/signup"}
              style={{ backgroundColor: Theme.warmYellow }}
              className="text-2xl px-20 py-3 rounded-full text-black font-semibold max-md:px-15"
            >
              Get Started
            </Link>
          </div>

          <p
            style={{ color: Theme.SoftPaleCream }}
            className="text-xl font-light text-center italic max-md:text-sm"
          >
            Here, students and beginners can learn at their own pace, ask questions without fear,
            and build real skills through collaboration, guidance, and shared experiences.
          </p>
        </div>
      </section>

      {/* Features Section - Light Themed Content */}
      <section className="py-24 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">What We Offer</h2>
            <div style={{ backgroundColor: Theme.DeepRoyalPurple }} className="h-1.5 w-24 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Collaborative Projects", desc: "Work together on open-source projects to build a professional portfolio while learning the ropes." },
              { title: "Skill Roadmaps", desc: "Step-by-step guides for mastering Frontend, Backend, and Mobile development at your own pace." },
              { title: "Safe Space", desc: "A judgment-free zone designed specifically for beginners to ask any question without fear." }
            ].map((item, i) => (
              <div style={{ backgroundColor: Theme.LightPurple }} key={i} className="p-10 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 text-black">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed font-light text-white">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Light Themed Content */}
      <section className="py-24 bg-slate-100/70 backdrop-blur-md">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-black mb-8 text-slate-900 leading-tight">Empowering the next generation of creators.</h2>
            <p className="text-lg text-slate-700 mb-6 font-medium">
              Our mission is to bridge the gap between classroom theory and real-world application.
              By connecting with others, you learn faster, solve bugs quicker, and stay motivated throughout your journey.
            </p>
            <ul className="space-y-4 mb-8">
              {['Weekly coding challenges', 'Peer-to-peer code reviews', 'Monthly tech workshops'].map((li, i) => (
                <li key={i} className="flex items-center gap-3 font-medium text-slate-800">
                  <span style={{ color: Theme.warmYellow }} className="text-xl">●</span> {li}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 aspect-video bg-white/50 overflow-hidden rounded-3xl border-4 border-white shadow-inner flex items-center justify-center text-slate-400 italic p-8">
    <video
      src="/Learn How To Code.mp4"
      controls
      className="w-full h-full object-cover rounded-xl" 
    />
</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-black mb-6 text-slate-900">Start Your Journey Today.</h3>
          <p className="text-slate-500 font-medium mb-8 max-w-md mx-auto">
            Ready to stop coding alone? Join our community and grow with others.
          </p>
        </div>
      </footer>
    </main>
  );
}