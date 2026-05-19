"use client"
import React, { useEffect, useState } from 'react';
import { Theme } from "@/components/Theme";
import { FiTrash2, FiUser } from "react-icons/fi";
import { collection, getDocs, doc, deleteDoc, query } from "firebase/firestore";
import { db } from '@/config/firebase';
import { FiLoader } from "react-icons/fi";

const TechTipsFeed = ({ session }) => {
    const [techTips, setTechTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageErrors, setImageErrors] = useState({});

    // Replace this with your actual developer email
    const DEVELOPER_EMAIL = "your-email@example.com"; 

    const handleFetch = async () => {
        setLoading(true);
        const ideas = [];
        try {
            const q = query(collection(db, "tech-tips"));
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach((doc) => {
                ideas.push({
                    postId: doc.id,
                    ...doc.data()
                });
            });
            
            setTechTips(ideas);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);

    const handleDelete = async (id) => {
        try {
            if (confirm("Are you sure you want to permanently delete this published tip?")) {
                await deleteDoc(doc(db, "tech-tips", id));
                setTechTips((prevTips) => prevTips.filter(tip => tip.postId !== id));
                alert("Tip deleted successfully!");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete tip.");
        }
    };

    const handleImageError = (postId) => {
        setImageErrors((prev) => ({ ...prev, [postId]: true }));
    };

    // 1. Loading UI
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <FiLoader className="text-4xl animate-spin" style={{ color: Theme.LightPurple }} />
                <p className="mt-4 font-bold text-slate-400 italic">Fetching tech tips...</p>
            </div>
        );
    }

    return (
        <main className="min-h-dvh bg-slate-50 text-slate-600 pb-20">
            <section className="bg-white border-b border-slate-200 py-16 px-6 mb-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl text-gray-700 font-black mb-4">
                        Community <span style={{ color: Theme.LightPurple }} className='font-serif'>Tech-Tips</span>
                    </h1>
                    <p className="text-slate-700 font-medium text-lg max-w-2xl mx-auto">
                        Latest knowledge snippets shared by our members.
                    </p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-6 z-10">
                <div className="flex flex-col gap-8">
                    {/* Safety check: ensure techTips exists and is an array */}
                    {Array.isArray(techTips) && techTips.length > 0 ? (
                        techTips.map((tip) => {
                            const canDelete = 
                                session?.user?.id === tip.refId || 
                                session?.user?.email === tip.refId ||
                                session?.user?.email === DEVELOPER_EMAIL;

                            return (
                                <article
                                    key={tip.postId}
                                    className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col group w-full"
                                >
                                    {/* The Outer Padding Container remains relative for absolute positioning of the delete button */}
                                    <div className="p-8 md:p-10 relative">
                                        
                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDelete(tip.postId)}
                                            className="absolute top-6 right-6 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all z-20"
                                        >
                                            <FiTrash2 size={20} />
                                        </button>

                                        {/* Main Grid Container */}
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                                            
                                            {/* Content Area (Left: 9 out of 12 columns) */}
                                            <div className="md:col-span-9 flex flex-col gap-4">
                                                {/* Category & Timestamp meta bar */}
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white"
                                                        style={{ backgroundColor: Theme.LightPurple }}
                                                    >
                                                        {tip.cat}
                                                    </span>
                                                    <span className="text-xs text-slate-400 font-medium">{tip.timestamp}</span>
                                                </div>

                                                {/* Header Title */}
                                                <h2 className="text-2xl md:text-3xl font-bold leading-tight text-slate-900 pr-6">
                                                    {tip.techTip}
                                                </h2>

                                                {/* Body Description Block */}
                                                <div className="w-full bg-slate-50/70 border border-slate-100 rounded-2xl p-6">
                                                    <p className="text-slate-700 leading-relaxed text-base whitespace-pre-wrap">
                                                        {tip.desc}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Author Profile Sidebar (Right: 3 out of 12 columns) */}
                                            <div className="md:col-span-3 flex md:flex-col items-center md:items-end justify-start gap-3 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 w-full h-full text-right">
                                                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center border border-slate-100 bg-slate-100 shadow-sm shrink-0">
                                                    {!tip.authorImg || imageErrors[tip.postId] ? (
                                                        <div 
                                                            className="w-full h-full flex items-center justify-center text-white font-bold text-sm"
                                                            style={{ backgroundColor: Theme.LightPurple }}
                                                        >
                                                            {tip.author ? tip.author.charAt(0).toUpperCase() : <FiUser />}
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={tip.authorImg}
                                                            alt={tip.author}
                                                            onError={() => handleImageError(tip.postId)}
                                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex flex-col items-start md:items-end">
                                                    <span className="text-xs text-slate-400 font-medium hidden md:block">Posted by</span>
                                                    <p className="text-sm font-bold text-slate-800 break-all">{tip.author || "Anonymous"}</p>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </article>
                            );
                        })
                    ) : (
                        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
                            <p className="text-slate-400 font-medium">No tech tips found.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default TechTipsFeed;