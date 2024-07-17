"use client";
import Link from "next/link";

const NotLoggedIn = () => {
  return (
    <section className="min-h-screen w-full flex flex-col space-y-4 items-center justify-center">
      <div className="w-11/12 max-w-xs p-4 border border-red-300 bg-red-100/50 flex flex-col items-center justify-center space-y-4 rounded-md">
        <p className="text-red-500">You don&apos;t seem to be logged in</p>
      </div>
      <Link
        href={"/auth/login"}
        className="border border-purple-200 p-2 rounded-md text-purple-300 hover:border-purple-500 hover:text-purple-500 hover:shadow-lg px-8 py-2 duration-200 transition-all ease-in-out"
      >
        Log in
      </Link>
    </section>
  );
};

export default NotLoggedIn;
