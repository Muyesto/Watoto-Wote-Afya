"use client";

// Components
import NotLoggedIn from "@/components/auth/not-logged-in";
import LoadingComponent from "@/components/shared/loading";
import NavBar from "@/components/shared/nav-bar";
import UserProfile from "@/components/shared/profile";

// Firebase
import { FIREBASE_AUTH } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

// React
import { useEffect, useState } from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // States to check loading and if there is a user
  const [user, setUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect to check if there is a user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (!user) {
        setUser(false);
        setLoading(false);
      } else {
        setUser(true);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // If loading, show loading component
  if (loading) return <LoadingComponent />;

  // If there is no user, show not logged in component
  if (!user) return <NotLoggedIn />;

  // If there is a user, show the dashboard
  return (
    <section className="min-h-screen w-full  px-24 p-10 space-y-3">
      <UserProfile />
      <NavBar />
      {children}
    </section>
  );
};

export default DashboardLayout;
