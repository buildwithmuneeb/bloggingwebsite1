"use client";
import BackButton from "@/components/backButton";
import Loader from "@/components/loader";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const page = () => {
  // const [loading, setLoading] = useState(false)

  const [blogFormData, setBlogFormData] = useState({
    title: "",
    category: "",
    desc: "",
  });
  const [tempImage, setTempImage] = useState("")
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false)

  const [desc,setDesc] = useState('');

  const changeHandler = (e) => {
    const { name, value } = e.target;

    //    console.log(e.target.value)

    setBlogFormData({ ...blogFormData, [name]: value });
  };

  const handlesubmit = async (e) => {
    // e.preventDefault();
    try {

      setLoading(true)
      const res = await axios.post("/api/blog", { ...blogFormData, image:tempImage , desc:desc });
      // console.log(res)
      if (res?.data?.success) {
        toast.success("Blog Added Successfully");
      }
    } catch (error) {
      console.log(error?.response?.data)
      if (error?.response?.data?.success == false) {
        toast.error("Error Happen");
      }
    } finally{
      setLoading(false)
    }
  };

  const getCategories = async ()=> {
    try {
      var data = await fetch("http://localhost:3000/api/category");
      data = await data.json();
      if (data.success) {
        setCategories(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getCategories()
  },[])

  return (
    <div>
      <Toaster />
      <BackButton/>
      <form onSubmit={handlesubmit}>
        <div class="max-w-xl mx-auto mt-4 flex w-full flex-col border rounded-lg bg-white p-8">
          <h2 class="title-font mb-1 text-lg font-medium text-gray-900">
            New Blog
          </h2>
          <p class="mb-5 leading-relaxed text-gray-600">
            If you had any issues or you liked our website, please share with
            us!
          </p>
          <div class="mb-4">
            <label for="title" class="text-sm leading-7 text-gray-600">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              class="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              onChange={changeHandler}
              value={blogFormData.value}
            />
          </div>
          <div class="mb-4">
            <label for="category" class="text-sm leading-7 text-gray-600">
              Select Category
            </label>
            <select
              class="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              name="category"
              id="category"
              value={blogFormData.category}
              onChange={changeHandler}
            >
              <option value="">Select</option>
              {categories?.map((v,i) => {
                return (
                  <option className="capitalize" key={i} value={v?._id}>
                    {v?.title}
                  </option>
                );
              })}
            </select>
            {/* <input
              type="text"
              id="title"
              name="Title"
              class="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            /> */}
          </div>
          <div className=" mb-2">
      <CldUploadWidget
            // uploadPreset="blog-image"
            uploadPreset="blog-app"
            onSuccess={(results)=>{
                if(results.info?.secure_url && results?.event== "success"){
                 setTempImage(results.info.secure_url)
                }
            }}
            
          >
            {({ open }) =>{
              return  (
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-md bg-gray-400 px-3 py-1 text-white max-md:text-sm hover:bg-orange-400"
                  onClick={open}
                >
                  <i className="bx bx-image-add"></i>
                  <span>Upload Image</span>
                </button>
              )
            }}
      </CldUploadWidget>
      </div>
      {/* <div> */}
        {tempImage && (
       
        <div className="w-[100px] h-[100px] relative">
          <img 
          src={tempImage} 
          // src="https://res.cloudinary.com/dzij0rnnw/image/upload/v1721856953/suuwt1kvqzv0pio2xyrl.jpg"
          alt="Image Here" 
          className="w-full object-cover rounded-lg " />
        <i onClick={()=> setTempImage("")} className="fa-solid fa-xmark absolute right-1 top-1 text-white cursor-pointer"></i>
        </div>
        )}
          <div class="mb-4">
            <label for="desc" class="text-sm leading-7 text-gray-600">
              Desc
            </label>
            <ReactQuill onChange={desc} value={desc}/>
            {/* <textarea
              id="desc"
              name="desc"
              class="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={blogFormData.desc}
              onChange={changeHandler}
            ></textarea> */}
          </div>
          <div className="flex gap-2">

          
        
          <button
            type="submit"
            value="Submit"
            class="rounded border-0 bg-blue-600 hover:bg-blue-700 p-3 text-lg text-white focus:outline-none"
          >
            {loading? <Loader/> : "Add Blog"}
          </button>
          <Link href={"/admin/blogs/blogsform"} className="p-3 inline-block bg-green-600 hover:bg-green-700  text-white rounded-md "> Add More Blogs</Link>
          </div>
          <p class="mt-3 text-xs text-gray-500">Feel free to add more blogs.</p>
        </div>
       
      </form>
    </div>
  );
};

export default page;
