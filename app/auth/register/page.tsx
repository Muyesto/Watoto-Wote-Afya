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
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebase";

// Router
import { useRouter } from "next/navigation";
import { registerWithEmailAndPassword } from "@/actions";

const RegisterPage = () => {
  // Register states
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");

  // Error and success states
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Loading state
  const [loading, setLoading] = useState<boolean>(false);

  // Router
  const router = useRouter();

  // Handle Register
  const onSubmit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    await registerWithEmailAndPassword(email, password, displayName).then(
      (result) => {
        if (result.successState) {
          setSuccess("User registered successfully");
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
          setLoading(false);
        } else {
          if (result.errorMessage) {
            setError(result.errorMessage);
            setLoading(false);
            setTimeout(() => {
              setError("");
              setEmail("");
              setPassword("");
            }, 2000);
          }
        }
      }
    );
    // await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
    //   .then(async (result) => {
    //     console.log("Result: ", result);
    //     const currentUser = FIREBASE_AUTH.currentUser;

    //     await updateProfile(currentUser!, {
    //       displayName,
    //     })
    //       .then((result) => {
    //         setSuccess("User registered successfully");
    //         setTimeout(() => {
    //           router.push("/dashboard");
    //         }, 2000);
    //         setLoading(false);
    //       })
    //       .catch((error) => {
    //         setError(error.message);
    //         setLoading(false);
    //         setTimeout(() => {
    //           setError("");
    //           setEmail("");
    //           setPassword("");
    //         }, 2000);
    //       });
    //   })
    //   .catch((error) => {
    //     setError(error.message);
    //     setLoading(false);
    //     setTimeout(() => {
    //       setError("");
    //       setEmail("");
    //       setPassword("");
    //     }, 2000);
    //   });
  };

  // Sign in with google
  const signInWithGoogle = async () => {
    setLoading(true);
    await signInWithPopup(FIREBASE_AUTH, new GoogleAuthProvider())
      .then((result) => {
        setLoading(false);
        if (result.user) {
          setSuccess("Logged in successfully");
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
        <h1 className="text-xl font-semibold capitalize">Register below</h1>
        <input
          type="text"
          className="border w-full p-2 focus:outline-none rounded-md"
          placeholder="What you'd like to be called"
          required
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
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
        <button
          disabled={loading}
          className={`w-full p-3 rounded-md ${
            loading
              ? "bg-purple-200 text-slate-100"
              : "bg-purple-500 text-white"
          } hover:shadow-lg transition-all duration-200`}
        >
          {loading ? "Loading..." : "Register"}
        </button>
        <div className="flex items-center justify-between w-full">
          <Link
            href={"/auth/login"}
            className="underline text-purple-500 text-sm"
          >
            Already have an account? Log in
          </Link>
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

export default RegisterPage;
