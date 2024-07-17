"use client";

// Firebase
import { FIREBASE_AUTH } from "@/firebase";
import { signOut } from "firebase/auth";

// Next
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  // User data
  const currentUser = FIREBASE_AUTH.currentUser;
  const displayName = currentUser?.displayName;
  const userImage = currentUser?.photoURL;

  //   Router
  const router = useRouter();

  // Functions
  const handleSignOut = async () => {
    console.log("Signing out");
    await signOut(FIREBASE_AUTH).then(() => {
      router.push("/");
    });
  };
  return (
    <div className="flex items-center justify-between">
      <div className="w-full flex items-center gap-2">
        <div className="w-16 h-16 bg-slate-50 p-2 rounded-full border">
          <div className="w-full h-full rounded-full shadow-md flex items-center justify-center bg-white relative">
            {userImage ? (
              <Image
                src={userImage}
                alt="user image"
                fill
                className="object-cover rounded-full"
              />
            ) : (
              // Extract the user's initials
              <p className="text-lg font-semibold text-purple-500">
                {displayName
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")}
              </p>
            )}
          </div>
        </div>
        <div>
          <p className="text-lg font-bold">{displayName}</p>
          <p className="text-sm text-slate-400">User</p>
        </div>
      </div>
      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white text-sm px-4 text-nowrap p-3 rounded-md shadow-lg hover:shadow-none hover:bg-red-600 transition-all ease-in-out duration-300"
      >
        Log out
      </button>
    </div>
  );
};

export default UserProfile;
