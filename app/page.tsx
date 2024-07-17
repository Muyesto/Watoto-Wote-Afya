import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen h-screen flex md:p-24 p-10 gap-5">
      <div className="flex-[3] h-full space-y-4">
        <span className="text-sm text-slate-400">
          Your #1 stop for professional support
        </span>
        <h1 className="text-6xl font-bold">
          Welcome to
          <span className="text-purple-500 block capitalize">
            watoto wote afya
          </span>
        </h1>
        <p>
          Here you can add a description about the project, anything the user
          needs to see before they sign up. This is a great place to add some
          information about the project, the benefits of signing up, and how the
          user can get started.
        </p>
        <div className="flex items-center gap-5 w-1/2">
          <Link
            href={"/auth/register"}
            className="bg-purple-500 text-white text-center px-4 py-2 rounded-lg flex-1 hover:shadow-lg transition-all duration-200"
          >
            Get Started
          </Link>
          <Link
            href={"/auth/login"}
            className="border border-purple-500 text-center rounded-lg px-4 py-2 text-slate-600 flex-1 hover:shadow-lg transition-all duration-200"
          >
            Log in
          </Link>
        </div>
      </div>
      <div className="w-full h-full flex-[2] relative hidden lg:block">
        <Image
          src="/images/hero-background.jpeg"
          alt="logo"
          fill
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>
    </main>
  );
}
