"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    name: "Home",
    href: "/dashboard",
  },
  {
    name: "Upcoming",
    href: "/dashboard/upcoming",
  },
  {
    name: "Completed",
    href: "/dashboard/completed",
  },
  {
    name: "Missed",
    href: "/dashboard/missed",
  },
  {
    name: "All",
    href: "/dashboard/all",
  },
];

const NavBar = () => {
  const pathname = usePathname();
  return (
    <div className="w-fit bg-slate-100 p-2 rounded-lg flex items-center gap-2 text-sm">
      {items.map((item) => (
        <Link
          href={item.href}
          key={item.href}
          className={`p-2 rounded-md ${
            pathname === item.href
              ? "bg-white text-slate-700 shadow-lg"
              : "text-slate-400"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default NavBar;
