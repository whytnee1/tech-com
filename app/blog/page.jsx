import React from 'react';
import { Theme } from "@/components/Theme";
import Link from "next/link";

const BlogPage = () => {
  // Mock array for Blog Posts with Read Time included
  const blogPosts = [
    {
      id: 1,
      tag: "Insights",
      title: "The Future of Frontend: Why Tailwind is Winning",
      excerpt: "An in-depth look at the shift towards utility-first CSS and how it impacts developer velocity in 2026.",
      date: "May 12, 2026",
      author: "Destiny Chukwuemeka",
      readTime: "6 min read"
    },
    {
      id: 2,
      tag: "Updates",
      title: "Community Milestone: 10k Members Strong",
      excerpt: "Celebrating our growth and announcing new collaborative features coming to the Tech Community hub.",
      date: "May 05, 2026",
      author: "Admin Team",
      readTime: "3 min read"
    },
    {
      id: 3,
      tag: "Articles",
      title: "Mastering Next.js Server Components",
      excerpt: "Precision-focused guide on optimizing data fetching and reducing bundle sizes for enterprise apps.",
      date: "April 28, 2026",
      author: "Senior Dev",
      readTime: "8 min read"
    }
  ];

  return (
    <main className="relative min-h-dvh overflow-x-hidden font-sans">
      {/* Fixed Background Image Layer */}
      <div 
        className="fixed top-0 left-0 w-full h-full bg-[url('/bg4.jpg')] bg-center bg-no-repeat bg-cover -z-10"
      ></div>

      {/* Blog Hero Section */}
      <section className="min-h-[40dvh] bg-black/80 flex items-center justify-center">
        <div className="text-white lg:w-2/3 mx-auto flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
          <h1 className="text-6xl font-black max-md:text-4xl uppercase tracking-tighter">
            The Blog
          </h1>
          <div style={{ backgroundColor: Theme.warmYellow }} className="h-1.5 w-24 rounded-full"></div>
          <p className="text-xl font-light text-slate-300 max-w-2xl italic leading-relaxed">
            Precise insights and technical updates from the core of the Tech Community.
          </p>
        </div>
      </section>

      {/* Article Grid Section - Light Theme */}
      <section className="py-24 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {blogPosts.map((post) => (
              <article 
                key={post.id} 
                className="flex flex-col group cursor-pointer"
              >
                {/* Featured Graphic Area */}
                <div className="aspect-video bg-slate-200 rounded-3xl mb-6 overflow-hidden border border-slate-100 relative shadow-sm">
                   <div 
                    style={{ backgroundColor: Theme.warmYellow }} 
                    className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[10px] font-black uppercase text-black"
                   >
                    {post.tag}
                   </div>
                   <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-300 group-hover:scale-105 transition-transform duration-700"></div>
                </div>

                {/* Content Metadata */}
                <div className="px-2">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 mb-3 uppercase tracking-widest">
                    <span>{post.date}</span>
                    <span className="text-slate-300">•</span>
                    <span>{post.author}</span>
                    <span className="text-slate-300">•</span>
                    <span style={{ color: Theme.DeepRoyalPurple }}>{post.readTime}</span>
                  </div>

                  <h2 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-black transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-900 font-light leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 font-black text-sm uppercase tracking-tighter hover:gap-4 transition-all"
                    style={{ color: Theme.DeepRoyalPurple }}
                  >
                    Read Article <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-slate-50/40 backdrop-blur-md border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Stay Synchronized</h3>
          <p className="text-black mb-8 font-light">Get precise updates and weekly developer insights delivered to your inbox.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-8 py-4 rounded-full bg-white border border-slate-200 outline-none focus:ring-2 focus:ring-slate-300 w-full md:w-96 transition-all"
            />
            <button 
              style={{ backgroundColor: Theme.warmYellow }} 
              className="px-10 py-4 rounded-full text-black font-black uppercase text-xs shadow-lg hover:-translate-y-1 transition-all"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white text-center border-t border-slate-100">
        <p style={{ color: Theme.SoftPaleCream }} className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
          © 2026 Tech Community — Precise Editorial Section
        </p>
      </footer>
    </main>
  );
};

export default BlogPage;