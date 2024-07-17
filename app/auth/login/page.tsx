"use client";

// React
import { FormEvent, useState } from "react";

// Next
import Link from "next/link";

// Components
import FormError from "@/components/auth/form-error";
import FormSuccess from "@/components/auth/form-success";

// Icons
import { FcGoogle } from "react-icons/fc";

// Firebase
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebase";

// Router
import { useRouter } from "next/navigation";

const LoginPage = () => {
  // Login state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Error and success states
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Loading state
  const [loading, setLoading] = useState<boolean>(false);

  // Router
  const router = useRouter();

  // Handle login
  const onSubmit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (email === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }

    await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((result) => {
        setLoading(false);
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        if (
          error == "FirebaseError: Firebase: Error (auth/invalid-credential)."
        ) {
          setError("Invalid credentials");
          setTimeout(() => {
            setError("");
            setEmail("");
            setPassword("");
          }, 2000);
          return;
        }
      });
  };

  // Login with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    await signInWithPopup(FIREBASE_AUTH, new GoogleAuthProvider())
      .then((result) => {
        setLoading(false);
        if (result.user) {
          setSuccess("Logged in successfully");
          // Redirect to dashboard
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      });
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="w-3/4 p-3 rounded-md space-y-3 flex flex-col items-center"
      >
        <h1 className="text-xl font-semibold capitalize">Log in below</h1>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 focus:outline-none rounded-md"
          placeholder="Email address"
        />
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 focus:outline-none rounded-md"
          placeholder="Password"
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <button className="w-full p-3 rounded-md bg-purple-500 text-white hover:shadow-lg transition-all duration-200">
          Log in
        </button>
        <div className="flex items-center justify-between w-full">
          <Link
            href={"/auth/register"}
            className="underline text-purple-500 text-sm"
          >
            Register
          </Link>
          <p>Forgot password</p>
        </div>
        <span className="text-xl font-light text-slate-300 uppercase">or</span>
      </form>
      <button
        onClick={signInWithGoogle}
        className="w-3/4 mx-auto p-3 rounded-md border border-purple-500 flex items-center justify-center hover:shadow-lg transition-all duration-200"
      >
        <FcGoogle size={20} />
      </button>
    </>
  );
};

export default LoginPage;
