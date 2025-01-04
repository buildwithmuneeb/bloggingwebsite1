"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import React from 'react'

const DeleteBl= ({id}) => {
    const router = useRouter()

    const delBtn = async ()=>{
        try {
            const mess = window.confirm("Are you sure you want to delete this Blog ")
            if (!mess) {
                return
            } else {
                const del = await axios.delete(`/api/blog/${id}`)
                toast.success("Blog Deleted")
                router.refresh()
                
            }
            
        } catch (error) {
            console.log(error)
            toast.error("Error Happen")
        }
    }
  return (
    <div>
        <Toaster/>
      <button onClick={delBtn}><i className='bx bxs-trash  hover:text-red-600'></i></button>
    </div>
  )
}

export default DeleteBl
