"use client";

import React, { useState } from 'react';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { FaRegPaperPlane, FaLightbulb, FaLayerGroup, FaAlignLeft, FaThumbsUp, FaLock } from "react-icons/fa";
import { Theme } from "@/components/Theme";
import * as Yup from 'yup';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '@/config/firebase';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { FiLoader } from "react-icons/fi";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Link from 'next/link';

// Modal styling
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '2rem',
  boxShadow: 24,
  p: 4,
  outline: 'none',
};

export default function UploadClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  
  const handleClose = () => {
    setOpen(false);
    // Ensure this path exists in your app/ directory
    router.push('/tip'); 
  };

  const iv = {
    techTip: "",
    cat: "",
    desc: ""
  };

  const categories = [
    "Programming & Coding",
    "Web Development",
    "Cyber Security",
    "Mobile Technology",
    "Computer & PC tips",
    "AI & Emerging Tech",
    "Networking & Internet",
    "Tech Career & learning",
    "Hardware & Gadgets",
    "Software & Apps",
    "Gaming"
  ];

  const valSchema = Yup.object({
    techTip: Yup.string()
      .min(5, "Title is too short")
      .required("Upload tip title is required"),
    cat: Yup.string()
      .required("Please select a tech category"),
    desc: Yup.string()
      .min(20, "Please provide a more detailed description")
      .required("Description is required")
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // Extra safety check
    if (status !== "authenticated") {
      alert("Session expired. Please sign in again.");
      return;
    }

    try {
      const dbobject = {
        ...values,
        author: session?.user?.name || "Anonymous",
        authorImg: session?.user?.image || "",
        refId: session?.user?.id || session?.user?.email || "unknown",
        // Using serverTimestamp is better for consistent ordering
        createdAt: serverTimestamp(), 
        timestamp: new Date().toLocaleDateString()
      };

      await addDoc(collection(db, "tech-tips"), dbobject);

      handleOpen();
      resetForm();
    } catch (error) {
      console.error("Submission error:", error.message);
      alert("Error: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // 1. LOADING STATE
  // If the status is loading, don't render anything that might trigger a redirect
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <FiLoader className="text-4xl animate-spin" style={{ color: Theme.LightPurple }} />
        <p className="mt-4 font-bold text-slate-500 italic">Verifying session...</p>
      </div>
    );
  }

  // 2. UNAUTHENTICATED STATE
  // Instead of redirecting automatically, we show the login prompt
  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 text-center max-w-md">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
            <FaLock size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">Sign in Required</h2>
          <p className="text-slate-500 mb-8 font-medium">
            You need to be signed in to share tech tips with the community.
          </p>
          <Link 
            href="/signin" 
            style={{ backgroundColor: Theme.LightPurple }}
            className="block w-full py-4 rounded-2xl text-white font-black shadow-lg hover:brightness-110 transition-all"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  // 3. AUTHENTICATED STATE
  return (
    <div className="flex flex-col items-center w-full py-10 px-4">
      <div className="w-full max-w-2xl bg-[#FFFDE7] rounded-[2.5rem] shadow-2xl shadow-slate-400/20 border border-slate-200 overflow-hidden">
        
        <div className="p-10 pb-2 text-center">
          <h1 className="text-4xl font-black tracking-tight text-gray-700 mb-2">
            Publish{" "}
            <span style={{ color: Theme.LightPurple }}>Tech Tip</span>
          </h1>
          <p className="text-slate-600 font-medium italic">
            Empower others with your technical knowledge, {session?.user?.name?.split(' ')[0]}
          </p>
        </div>

        <Formik
          initialValues={iv}
          validationSchema={valSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="p-10 flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 font-bold text-slate-700 ml-1">
                  <FaLightbulb style={{ color: Theme.warmYellow }} />
                  Tech Title
                </label>
                <Field
                  name="techTip"
                  placeholder="e.g. Master React Server Components"
                  className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border transition-all text-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${
                    errors.techTip && touched.techTip ? "border-red-400" : "border-slate-200"
                  }`}
                />
                <ErrorMessage name="techTip" component="div" className="text-red-500 text-xs font-bold ml-2 italic" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 font-bold text-slate-700 ml-1">
                  <FaLayerGroup style={{ color: Theme.warmYellow }} />
                  Tech Category
                </label>
                <div className="relative">
                  <Field
                    as="select"
                    name="cat"
                    className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border transition-all text-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 appearance-none ${
                      errors.cat && touched.cat ? "border-red-400" : "border-slate-200"
                    }`}
                  >
                    <option value="" disabled>Select a category</option>
                    {categories.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </Field>
                  <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-400 text-xs">▼</div>
                </div>
                <ErrorMessage name="cat" component="div" className="text-red-500 text-xs font-bold ml-2 italic" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 font-bold text-slate-700 ml-1">
                  <FaAlignLeft style={{ color: Theme.warmYellow }} />
                  Description
                </label>
                <Field
                  as="textarea"
                  name="desc"
                  rows="6"
                  placeholder="Explain the tip clearly here..."
                  className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border transition-all text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400/50 ${
                    errors.desc && touched.desc ? "border-red-400" : "border-slate-200"
                  }`}
                />
                <ErrorMessage name="desc" component="div" className="text-red-500 text-xs font-bold ml-2 italic" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{ backgroundColor: Theme.LightPurple }}
                className="mt-4 w-full py-5 rounded-2xl text-white font-black text-xl flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.98] transition-all shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <FiLoader className='text-2xl animate-spin' />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <FaRegPaperPlane className="text-lg" />
                    <span>Publish Tip</span>
                  </>
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className='flex items-center justify-center'>
            <FaThumbsUp className='text-6xl' style={{ color: Theme.LightPurple }} />
          </Typography>
          <Typography sx={{ mt: 2 }} className='text-center italic font-bold text-slate-700'>
            Tech tip was successfully submitted!
          </Typography>
          <button 
            onClick={handleClose}
            className="w-full mt-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors"
          >
            Awesome
          </button>
        </Box>
      </Modal>
    </div>
  );
}