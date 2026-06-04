import Image from "next/image";
import Link from "next/link"
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { Theme } from "./Theme";
import { FaCode } from "react-icons/fa6";

export default function Footer() {
  return (
    <main style={{background: Theme.LightPurple}} className="flex items-center justify-between px-10 py-3 max-lg:flex-col 
    max-lg:gap-5 text-white">
      <Link href={"/"} className=" flex items-center gap-1">
        <Image
          src={"/Tech.png"}
          alt="logo"
          width={500}
          height={500}
          className="w-40 h-20"
        />
        <span className="flex items-center justify-center text-white font-serif max-md:mr-22">
                            <p className="font-bold max-md:ml-2">LetsCode</p>
                           <FaCode className="ml-1 max-md:hidden" />
                        </span>
      </Link>

      <div className="flex items-center gap-8 text-sm max-md:flex-col">
        <Link href={"chat"}>Chat with us</Link>
        <Link href={"privacy"}>Privacy Policy</Link>
        <Link href={"terms"}>Terms of Service</Link>
        <Link href={"contact"}>Contact Support</Link>
      </div>

      <div>
         <p className="text-xs text-slate-400 uppercase tracking-widest">© 2026 Tech Community</p>
      </div>

      <div className="flex items-center gap-3 text-xl">
        <FaFacebook />
        <FaInstagram />
        <BsTwitterX />
        <FaLinkedin />
      </div>
    </main>
  );
}