"use client"
import BackButton from '@/components/backButton'
import axios from 'axios'
import { CldUploadWidget } from 'next-cloudinary'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'



const Page = ({params}) => {

    const blogId = params?.id

    const [formData, setformData] = useState({
        title:"",
        category:"",
        desc:""
    })

    const [categories, setCategories] = useState([])
    
    const [tempImage, setTempImage] = useState("")

    const changeHandler = (e)=>{
        const {name, value} = e.target

        setformData({...formData,[name]: value})
    }

    const handlesubmit = async (e)=>{
        e.preventDefault()

        try {
            
            const res = await axios.put(`http://localhost:3000/api/blog/${blogId}`,{...formData, image:tempImage})
            // console.log(res)
            if(res?.data?.success){
                toast.success("Blog Updated")
            }
            // console.log(formData.category.title);
            
        } catch (error) {
            // console.log(error)
            if(error?.response?.data?.success == false){
                toast.error("Error Happen while updating")
            }
        }
    }

    const getCategories = async ()=>{
        try {
            var res = await fetch("/api/category")
            res = await res.json()

            setCategories(res?.message)
            if (res?.success) {
                console.log(res.message)
            }
        } catch (error) {
            toast.error("Error Fetching Categories")
        }
    }

    
    const getSingleBlog = async ()=>{
        try {
            var data = await fetch(`http://localhost:3000/api/blog/${blogId}`)
            data = await data.json()
            // console.log(data)
            setformData(data?.message)
            setTempImage(data?.message?.image)
            // console.log(formData);
            
            
            
            
        } catch (error) {
            // console.log(error)
            toast.error("Failed to fetch blog details");
        }
        
    }
    
    useEffect(()=>{
        getCategories()

        getSingleBlog()
    },[])

  return (
    <div>
      <BackButton/>
      <form onSubmit={handlesubmit}>
        <Toaster/>
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
              value={formData.title}
            />
          </div>
          <div class="mb-4">
            <label htmlFor="category" class="text-sm leading-7 text-gray-600">
              Category
            </label>
            <select
              class="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              name="category"
              id="category"
              value={formData?.category?.title}
              onChange={changeHandler}
            >
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
            <textarea
              id="desc"
              name="desc"
              class="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={formData.desc}
              onChange={changeHandler}
            ></textarea>
          </div>
          <button
            type="submit"
            value="Submit"
            class="rounded border-0 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none"
          >
            {/* {loading? <Loader/> : "Add Category"} */} Update Blog
          </button>
          <p class="mt-3 text-xs text-gray-500">Feel free to update more blogs.</p>
        </div>
      </form>
    </div>
  )
}

export default Page
