"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import React from "react";

const DeleteCa = ({ id }) => {
  const router = useRouter();

  const delBtn = async () => {
    try {
      const mess = window.confirm(
        "Are you sure you want to delete this category "
      );
      if (!mess) {
        return;
      } else {
        const del = await axios.delete(`/api/category/${id}`);
        toast.success("Category Deleted");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Happen");
    }
  };
  return (
    <div>
      <Toaster />
      <div className="relative group">
        <button
          onClick={delBtn}
          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
        >
          <i className="bx bxs-trash"></i>
        </button>
        <span className="absolute transform -translate-x-1/2 -translate-y-7 px-2 py-1 text-xs bg-white text-red-600 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          Delete
        </span>
      </div>
    </div>
  );
};

export default DeleteCa;
