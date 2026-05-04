"use client"
import Link from "next/link";
import Image from "next/image";
import { LuUserRound } from "react-icons/lu";
import { RiMenu3Fill } from "react-icons/ri";
import { FaCode } from "react-icons/fa6";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function Navbar (){
 const [navOpen, setNavOpen] = useState(false);

    const navLinks = [
        {
            label: "HOME",
            url: "/"
        },
        {
            label: "BLOG",
            url: "/blog"
        },
        {
            label: "ABOUT",
            url: "/about"
        },
        {
            label: "CONTACT US",
            url: "/contact"
        }
    ]
    return (
        <main className="flex items-center justify-between px-6 py-0 shadow-md sticky top-0 w-full bg-[#FFFDE7] z-50">
            
                <Link href={"/"} className="flex items-center gap-1 z-50">
                <Image
                    src={"/Tech.png"}
                    alt="logo"
                    width={500}
                    height={500}
                    className="w-40 h-20"
                />
                <span className="flex items-center justify-center text-[#2E003E] font-serif max-md:mr-22">
                    <p className="font-bold max-md:ml-2">LetsCode</p>
                   <FaCode className="ml-1 max-md:hidden" />
                </span>
            </Link>

            {/* desktop and tab navbar */}
            <div className="flex items-center gap-8 mr-10 max-md:hidden md:ml-130">
                {
                    navLinks.map((item, i) => (
                        <Link key={i} href={"#"} className=" text-lg font-serif font-bold py-1 px-2 border hover:bg-[#4B0082] hover:text-white rounded-sm 
           border-white hover:border-[#4B0082] hover:scale-130 transition-transform duration-300 " href={item.url}>{item.label}</Link>
                    ))
                }
            </div>

             {/*mobile navabr  */}
            <div className={`md:hidden bg-white h-dvh w-full absolute top-0 left-0 ${navOpen ? "flex" : "hidden"} flex-col items-center gap-10 pt-20`}>
                {
                    navLinks.map((item, i) => (
                        <Link key={i} href={"#"} className="text-lg font-serif py-1 px-2 border-b-3
           border-white hover:border-[#4B0082] transition-all duration-300" href={item.url}>{item.label}</Link>
                    ))
                }
            <Link href={"/signin"} className="flex items-center gap-2 text-lg">
                Sign in
                <LuUserRound className="text-xl" />
            </Link>
            </div>

            <button
        onClick={() => setNavOpen(!navOpen)}
        className="md:hidden z-50 text-2xl"
      >
        {navOpen ? <IoMdClose /> : <RiMenu3Fill />}
      </button>
                
          <Link className="max-md:hidden " href={"/signin"}>
        <LuUserRound className="text-2xl" />
      </Link>
        </main>
    )
}