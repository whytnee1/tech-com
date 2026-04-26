import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <Image
      src={"/techLOGO.png"}
      alt="logo"
       width={500}
       height={500}
       className="w-full h-full opacity-20 bg-cover bg-center bg-no-repeat min-h-screen max-md:opacity-1"
       />
    </main>
  );
}
