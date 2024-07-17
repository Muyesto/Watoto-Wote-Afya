"use client";

// antd
import { MessageInstance } from "antd/es/message/interface";

// Firebase
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

/**
 * This function extends Firebase createUserWithEmailAndPassword and updateProfile
 * If a user is successfully created, the user is added to the database with isAdmin set to false
 *
 * @param email
 * @param password
 * @param displayName
 * @returns
 */
export const registerWithEmailAndPassword = async (
  email: string,
  password: string,
  displayName: string
) => {
  let successState = false;
  let errorState = false;
  let errorMessage;
  let resultMessage;
  await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
    .then(async () => {
      const currentUser = FIREBASE_AUTH.currentUser;
      await updateProfile(currentUser!, {
        displayName,
      })
        .then(async (result) => {
          resultMessage = result;
          // Set the user as an admin/user in the database
          // Structure /users/uid/{isAdmin: true/false}
          await setDoc(doc(FIREBASE_DB, "users", currentUser!.uid), {
            // Change to true if you want the user to be an admin
            isAdmin: false,
          }).then(() => {
            successState = true;
          });
        })
        .catch((error) => {
          errorMessage = error.message;
          errorState = true;
        });
    })
    .catch((error) => {
      errorMessage = error.message;
      errorState = true;
    });

  return {
    successState,
    errorState,
    errorMessage,
    resultMessage,
  };
};

// Register user using Google
export const registerWithGoogle = async () => {};

// Delete a child
export const handleDelete = async (
  record: Child,
  messageApi: MessageInstance
) => {
  const recordID = record.documentID;
  const childName = record.name;
  await deleteDoc(doc(FIREBASE_DB, "children", `${recordID}`))
    .then(() => {
      messageApi.open({
        type: "success",
        content: `Successfully deleted ${childName}`,
      });
    })
    .catch(() => {
      messageApi.open({
        type: "error",
        content: `Failed to delete ${childName}`,
      });
    });
};
