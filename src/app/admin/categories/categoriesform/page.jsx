"use client"
import Loader from '@/components/loader'
import axios from 'axios'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const page = () => {

    const [formData, setFormData] = useState({
        title:""
    })

    // console.log(formData)

    const [loading, setLoading] = useState(false)

    const changeHandler = (e)=>{
       const {name, value} = e.target
    //    console.log(e.target.value)

    setFormData({...formData,[name]:value})
    }
    
    const handlesubmit = async (e)=>{

        e.preventDefault()

       try {
        setLoading(true)
        const res = await axios.post("/api/category",{...formData})
        console.log(res)
        if (res?.data?.success) {
            toast.success("Category Added Successfull")
        }
       } catch (error) {
        console.log(error?.response?.data)
        if (error?.response?.data?.success == false) {
            toast.error("Error Happen")
        }
       }finally{
        setLoading(false)
       }
    }

  return (
    <div>
        <Toaster/>
      <form action="" className='rounded bg-gray-200 p-6' onSubmit={handlesubmit} >
    <label htmlFor="category" className="block text-gray-700 mb-2">Category</label>
    <input type="text" id="category" name={"title"} required placeholder="Your category.." className="w-full p-3 mb-4 border border-gray-300 rounded" value={formData.value} onChange={changeHandler}/>
    <button type="submit" value="Submit" className=" inline-block bg-green-600 text-white p-3 rounded cursor-pointer hover:bg-green-700">{loading? <Loader/> : "Add Category"}</button>
    
    </form>
    </div>
  )
}

export default page
