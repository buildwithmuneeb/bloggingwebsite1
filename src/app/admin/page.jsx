"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handlesignout = async () => {
    const confirmation = confirm("Are you sure");

    if (confirmation) {
      await signOut({ callbackUrl: "/" });
      toast.success("Logout sucesfully");

    } else {
      return;
    }
  };


  return (
    <div >
      {session?.user?.email} <br/>


      
      Admin Dashboard <br/>
      <button onClick={handlesignout} className="hover:text-blue-500">logout</button>
    </div>
  );
};

export default page;
