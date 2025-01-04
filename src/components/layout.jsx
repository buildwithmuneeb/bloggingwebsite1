"use client";
import React from "react";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./footer";
import { SessionProvider } from "next-auth/react";

const Layout = ({ children }) => {
  var pathname = usePathname();

  return (
    <div>
      {pathname.startsWith("/admin") ? 
        <div className="border-black flex h-screen">
          <div className='w-56' >
            <Sidebar />
          </div>
          <SessionProvider>
          <div className="flex-1 p-4 ">{children} </div>
          </SessionProvider>
        </div>
       : 
        <div>
            <Header/>
        {children}
        <Footer/>
        </div>
      }
    </div>
  );
};

export default Layout;
