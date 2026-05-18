import SignupClient from "./signup";

export const metadata = {
  title: "Join Tech Community | Sign Up",
  description: "Create an account to start sharing and learning with other developers.",
};

export default function SignupPage() {
  return (
    <main className="min-h-screen w-full bg-[url('/bg1.jpg')] bg-center bg-no-repeat bg-cover bg-fixed relative">
      {/* Glassmorphism Overlay */}
      <div className="min-h-screen bg-white/60 backdrop-blur-md flex items-center justify-center py-12 px-6">
        <SignupClient />
      </div>
    </main>
  );
}