/* eslint-disable react-hooks/exhaustive-deps */
"use client";

// Firebase
import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebase";
import {
  collection,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  where,
} from "firebase/firestore";

// React
import { useEffect, useState } from "react";

// Ant Design
import { Table, Popconfirm, Button, message } from "antd";

// Components
import LoadingTable from "@/components/loading-states/loading-table";

// DayJS
import dayjs from "dayjs";

// Actions
import { handleDelete } from "@/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ChildrenTable = () => {
  // Firebase uid
  const currentUser = FIREBASE_AUTH.currentUser;
  const uid = currentUser?.uid;
  const [data, setData] = useState<Child[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Router
  const router = useRouter();

  // Message API
  const [messageApi, contextHolder] = message.useMessage();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date of Birth",
      dataIndex: "DOB",
      key: "DOB",
      render: (date: any) => {
        const formattedDate = dayjs(date.toDate()).format("DD/MMM/YYYY");
        return <p>{formattedDate}</p>;
      },
    },
    {
      title: "Edit",
      key: "edit",
      render: (record: Child) => (
        <Link href={`/dashboard/edit-child/${record.documentID}`}>Edit</Link>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (record: Child) => (
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          okText="I am sure"
          cancelText="Cancel"
          onConfirm={() => handleDelete(record, messageApi)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    const q = query(
      collection(FIREBASE_DB, "children"),
      where("parentID", "==", `${uid}`)
    );
    const unsub = onSnapshot(q, (snapshot: QuerySnapshot) => {
      const children: Child[] = [];
      snapshot.forEach((doc: QueryDocumentSnapshot) => {
        children.push({
          // Get the document ID
          documentID: doc.id,
          name: doc.data().name,
          DOB: doc.data().dob,
          parentID: doc.data().parentID,
        });
      });
      setData(children);
      setLoading(false);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      {contextHolder}
      {loading ? (
        <LoadingTable />
      ) : (
        <Table columns={columns} dataSource={data} rowKey="id" />
      )}
    </>
  );
};

export default ChildrenTable;
