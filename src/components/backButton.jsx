"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = () => {

    const router = useRouter()

  return (
    <div>
      <button type='button' value="Back" className=" float-right mr-2 cursor-pointer " onClick={()=>{router.back()}}><i className='bx bxs-left-arrow'>Go Back</i></button>
    </div>
  )
}

export default BackButton