"use client";

// Components
import ChildrenTable from "@/components/shared/children-table";

// Next
import Link from "next/link";

// Icons
import { IoMdAdd } from "react-icons/io";

const DashboardPage = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Manage children</h1>
        <Link
          href={"/dashboard/add-child"}
          className="px-6 p-2 rounded-md border flex items-center gap-3 hover:border-purple-500 hover:drop-shadow-lg hover:text-purple-500 transition-all duration-150 ease-in-out"
        >
          <IoMdAdd />
          Add child
        </Link>
      </div>
      <ChildrenTable />
    </>
  );
};

export default DashboardPage;
