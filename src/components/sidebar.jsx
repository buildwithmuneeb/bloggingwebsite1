"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  var pathname = usePathname()
  const sideBarLinks = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: "bx bx-home",
      sIcon: "bx bxs-home",
    },
    {
      label: "Categories",
      href: "/admin/categories",
      icon: "bx bx-category",
      sIcon: "bx bxs-category",
    },
    {
      label: "Blogs",
      href: "/admin/blogs",
      icon: "bx bx-label",
      sIcon: "bx bxs-label",
    }
  ];

  return (
    <div className="p-4 h-screen border-r">
      <img
        className="w-32"
        src="https://esoftwave.com/wp-content/uploads/elementor/thumbs/logo1-e1733482880787-qy3uci6zyk96x03gk39j029s6rex0pjacol4btse80.png"
        alt=""
      />
      <div className="mt-4 space-y-2">
        {
          sideBarLinks.map((v,i)=>{
            return(
              <Link href={v.href} key={i} className={`flex items-center gap-2  p-2 border rounded-md hover:text-orange-400 ${pathname
                == v.href ? 'bg-orange-100 ' : null
              } `}>
              <i class={`text-xl ${pathname == v.href? v.sIcon : v.icon}`}></i>
              <div>{v.label}</div>
              </Link>
            )
          })
        }
      </div>
    </div>
  );
};

export default Sidebar;
