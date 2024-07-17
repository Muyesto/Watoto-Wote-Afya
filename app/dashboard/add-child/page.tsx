"use client";

import { FormEvent, useState } from "react";

// Next
import { useRouter } from "next/navigation";

// AntDesign
import { DatePicker, DatePickerProps } from "antd";

// Components
import FormError from "@/components/auth/form-error";
import FormSuccess from "@/components/auth/form-success";

// Firebase
import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

// DayJS
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";

const AddChild = () => {
  // Get current user
  const currentUser = FIREBASE_AUTH.currentUser;
  const parentID = currentUser?.uid;

  // Router
  const router = useRouter();

  // Input States
  const [name, setName] = useState<string>("");
  const [dob, setDob] = useState<any>("");

  // Loading state
  const [loading, setLoading] = useState<boolean>(false);

  // Form States
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Submit function
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName === "" || dob === "") {
      setError("Please fill in all fields");
      setTimeout(() => {
        setError("");
        setName("");
        setDob("");
      }, 1000);
      return;
    }
    setLoading(true);

    // Convert dob string to Date object
    const dobDate = dayjs(dob, "DD/MM/YYYY").toDate();

    // Convert Date object to Firebase Timestamp
    const dobTimestamp = Timestamp.fromDate(dobDate);

    // Add Child to Firestore

    // Structure: /children/{childID}/{name, dob, parentID}
    await addDoc(collection(FIREBASE_DB, "children"), {
      name,
      dob: dobTimestamp,
      parentID,
    })
      .then(() => {
        setSuccess("Child added successfully");
        setName("");
        setDob("");

        // Move to the dashboard page after a second
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      })
      .catch((error) => {
        setError(error.message);
        setName("");
        setDob("");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Date change function
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    setDob(dateString);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold capitalize">Add a new child</h1>
        <button
          onClick={() => router.back()}
          className="px-6 p-2 rounded-md border flex items-center gap-3 hover:border-purple-500 hover:drop-shadow-lg hover:text-purple-500 transition-all duration-150 ease-in-out"
        >
          Back
        </button>
      </div>
      <form onSubmit={onSubmit} className="w-1/3 space-y-3">
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full p-2 focus:outline-none rounded-md"
          placeholder="Child name"
        />
        <DatePicker
          onChange={onChangeDate}
          className="w-full"
          placeholder="Select date of birth"
          format="DD/MM/YYYY"
          needConfirm
          maxDate={dayjs(new Date().toISOString().split("T")[0], dateFormat)}
        />
        <FormError message={error} />
        <FormSuccess message={success} />
        <button
          className={`w-full p-3 rounded-md ${
            loading
              ? "bg-purple-300 text-slate-100"
              : "bg-purple-500 text-white"
          } hover:shadow-lg transition-all duration-200`}
        >
          {loading ? "Adding..." : "Add Child"}
        </button>
      </form>
    </>
  );
};

export default AddChild;
