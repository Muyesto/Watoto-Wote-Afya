import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-screen h-screen flex gap-5 p-24 bg-slate-100">
      <div className="w-full h-full bg-white flex-1 flex flex-col items-center justify-center rounded-lg">
        {children}
      </div>
      <div className="w-full h-full flex-1 relative hidden lg:block">
        <Image
          src="/images/login-background.jpg"
          alt="log in image"
          fill
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </section>
  );
}
