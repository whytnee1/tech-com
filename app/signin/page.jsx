"use client";

import Link from "next/link";
import Image from "next/image";
import { LuUserRound } from "react-icons/lu";
import { RiMenu3Fill } from "react-icons/ri";
import { FaCode } from "react-icons/fa6";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const navLinks = [
    { label: "HOME", url: "/" },
    { label: "TECH TIP", url: "/tip" },
    { label: "UPLOAD TIP", url: "/upload" },
    { label: "ABOUT", url: "/about" },
    { label: "CONTACT US", url: "/contact" }
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await signOut({ callbackUrl: "/" });
  };

  return (
    <main className="flex items-center justify-between px-6 py-0 shadow-md sticky top-0 w-full bg-white z-50">
      <Link href={"/"} className="flex items-center gap-1 z-50">
        <Image
          src={"/Tech.png"}
          alt="logo"
          width={500}
          height={500}
          className="w-40 h-15"
        />
        <span className="flex items-center justify-center text-[#2E003E] font-serif max-md:mr-22">
          <p className="font-bold max-md:ml-2">LetsCode</p>
          <FaCode className="ml-1 max-md:hidden" />
        </span>
      </Link>

      {/* desktop and tab navbar */}
      <div className="flex items-center gap-5 mr-1 max-md:hidden md:ml-130">
        {navLinks.map((item, i) => {
          const isActive = pathname === item.url;
          return (
            <Link
              key={i}
              href={item.url}
              className={`text-md font-serif font-bold py-1 px-2 border rounded-sm transition-transform duration-300 hover:scale-130 
                ${isActive 
                  ? "bg-[#4B0082] text-white border-[#4B0082]" 
                  : "border-white hover:bg-[#4B0082] hover:text-white hover:border-[#4B0082]"
                }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* mobile navbar */}
      <div className={`md:hidden bg-white h-dvh w-full absolute top-0 left-0 ${navOpen ? "flex" : "hidden"} flex-col items-center gap-10 pt-20`}>
        {navLinks.map((item, i) => {
          const isActive = pathname === item.url;
          return (
            <Link
              key={i}
              href={item.url}
              onClick={() => setNavOpen(false)}
              className={`text-lg font-serif py-1 px-2 border-b-3 transition-all duration-300 
                ${isActive ? "border-[#4B0082] text-[#4B0082] font-bold" : "border-white hover:border-[#4B0082]"}`}
            >
              {item.label}
            </Link>
          );
        })}

        {/* Injected right below CONTACT US when signed in */}
        {session ? (
          <>
            <Link 
              href={"/profile"} 
              className={`text-lg font-serif py-1 px-2 border-b-3 transition-all duration-300 
                ${pathname === "/profile" ? "border-[#4B0082] text-[#4B0082] font-bold" : "border-white hover:border-[#4B0082]"}`}
              onClick={() => setNavOpen(false)}
            >
              PROFILE
            </Link>
            <button 
              onClick={() => { setNavOpen(false); handleLogout(); }} 
              className="text-lg font-serif font-bold text-red-500 py-1 px-2 mt-4"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href={"/signin"} className="flex items-center gap-2 text-lg" onClick={() => setNavOpen(false)}>
            Sign in
            <LuUserRound className="text-xl" />
          </Link>
        )}
      </div>

      <button
        onClick={() => setNavOpen(!navOpen)}
        className="md:hidden z-50 text-2xl"
      >
        {navOpen ? <IoMdClose /> : <RiMenu3Fill />}
      </button>

      {/* Desktop and Tab profile icon menu structure */}
      {session ? (
        <div className="max-md:hidden">
          <button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <Avatar alt={session?.user?.name} src={session?.user?.image} />
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                'aria-labelledby': 'basic-button',
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <Link href={"/profile"} className="font-semibold">profile</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href={"/tip"} className="font-semibold">Tip</Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <button className="w-full text-red-500 font-bold text-lg m-0">
                Logout
              </button>
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <Link className="max-md:hidden" href={"/signin"}>
          <LuUserRound className={`text-2xl ${pathname === '/signin' ? 'text-[#4B0082]' : ''}`} />
        </Link>
      )}
    </main>
  );
}