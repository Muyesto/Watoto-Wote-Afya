/* eslint-disable react-hooks/exhaustive-deps */
"use client";

// React
import { FormEvent, useEffect, useState } from "react";

// Next
import { useParams, useRouter } from "next/navigation";

// Firebase
import {
  doc,
  DocumentData,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase";

// Components
import LoadingEditPage from "@/components/loading-states/loading-edit-page";
import FormError from "@/components/auth/form-error";
import FormSuccess from "@/components/auth/form-success";

// AntDesign
import { DatePicker, DatePickerProps } from "antd";

// DayJS
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";

const EditChildPage = () => {
  // Get the ID from the params
  const { id } = useParams();

  // Router
  const router = useRouter();

  // Loading state to get the child data
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DocumentData | undefined>();

  // Form data
  const [name, setName] = useState("");
  const [DOB, setDOB] = useState<any>("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formLoading, setFormLoading] = useState(false);

  // Functions
  const fetchData = async () => {
    const docRef = doc(FIREBASE_DB, "children", `${id}`);

    await getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setData(data);
        } else {
          console.log("No such document");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    // Convert dob string to Date object
    const dobDate = dayjs(DOB, "DD/MM/YYYY").toDate();

    // Convert Date object to Firebase Timestamp
    const dobTimestamp = Timestamp.fromDate(dobDate);

    await updateDoc(doc(FIREBASE_DB, "children", `${id}`), {
      name,
      dob: dobTimestamp,
    })
      .then(() => {
        setSuccess("Changes saved successfully");
        setError("");
        setTimeout(() => {
          setSuccess("");
          router.push("/dashboard");
        }, 1000);
      })
      .catch((error) => {
        setError("An error occurred while saving changes");
        setSuccess("");
        setTimeout(() => {
          setError("");
        }, 1200);
      })
      .finally(() => {
        setFormLoading(false);
      });
  };

  // Date change function
  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    setDOB(dateString);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingEditPage />;
  return (
    <>
      <h1 className="text-xl font-semibold">Edit Details for {data?.name}</h1>
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
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 border rounded-md hover:text-slate-500 transition-all duration-200 ease-in-out"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`flex-1 p-3 rounded-md ${
              formLoading
                ? "bg-purple-300 text-slate-100"
                : "bg-purple-500 text-white"
            } hover:shadow-lg transition-all duration-200`}
          >
            {formLoading ? "Changing..." : "Save Changes"}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditChildPage;
