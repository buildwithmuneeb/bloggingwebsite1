"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const page = () => {

  const [blogs, setBlogs] = useState([])

  const [lifestyle, setLifestyle] = useState([])
  const [trending, setTrending] = useState([])
  const [tech, setTech] = useState([])

  // console.log(blogs)

  const getBlog = async ()=>{
    try {
      const blogD = await fetch("/api/blog",{cache:"no-store"})
      const data = await blogD.json()
      // console.log(data?.message)
      setBlogs(data?.message)

      // setTrending(blogs.filter(blogs => blogs.category?.title === "Trending"))
      

      
      
    } catch (error) {
      toast.error("Error Happen while fetching blogs on Home Page")
      console.log(error)
    }
    }
    
    useEffect(()=>{
      getBlog()
    },[])
    
    useEffect(() => {
      setTrending(blogs.filter(blogs => blogs.category?.title === "Trending").slice(0, 3));
      setLifestyle(blogs.filter(blogs => blogs.category.title === "Lifestyle").slice(0, 3))
      setTech(blogs.filter(blogs => blogs.category.title === "Tech").slice(0, 3))
    }, [blogs])
  console.log(lifestyle)
    

  return (
    <div>
      <Toaster/>
      <div className="bg-black text-white min-h-screen font-sans">
     

      {/* Main Content */}
      <main >
        {/* Hero Section */}
        <section className="bg-black text-white text-center py-16">
          <h2 className="text-4xl font-bold">Welcome to <span className='text-red-600'>E</span>SOFTWAVE Blog</h2>
          <p className="text-xl mt-4">Insights, tutorials, and guides on web development, design, and technology.</p>
        </section>

        {/* Category 1 - Trending */}
        <section id="web-dev" className="py-16 bg-gray-900">
          <div className="container mx-auto text-center">
           
            <h2 className="text-3xl font-semibold mb-8 text-red-600">Trending</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trending?.map((v,i)=>(  
              <>
           
              
              {/* Blog Post */}
              <div key={i} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative w-full h-56 rounded-lg overflow-hidden mb-4">
                  <img
                    src={v?.image}
                    alt={v?.title}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <h4 className="text-xl font-semibold line-clamp-2">{v?.title}</h4>
                <Link href={`/blogdetails/${v?._id}`} className="mt-4 text-red-600 font-semibold hover:text-red-800 transition-all duration-200">Read More</Link>
              </div>

              </>
          
            ))}
            </div>
          </div>
        </section>

        {/* Category 2 - Lifestyle (Two-column Layout with Featured Post) */}
        <section id="design-ux" className="py-16 bg-gray-900">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-8 text-red-600">Lifestyle</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {lifestyle?.map((v,i)=>(
                <>
              
              {/* Blog Post */}
              <div key={i} className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative w-full h-60 rounded-lg overflow-hidden mb-4">
                  <img
                    src={v?.image}
                    alt={v?.title}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <h4 className="text-xl font-semibold line-clamp-2">{v?.title}</h4>
                <Link href={`/blogdetails/${v?._id}`} className="mt-4 text-red-600 font-semibold hover:text-red-800 transition-all duration-200">Read More</Link>
              </div>
              </>
))}

             
            </div>
          </div>
        </section>

        {/* Category 3 - Tech (Masonry Layout) */}
        <section id="tutorials" className="py-16 bg-gray-800">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-8 text-red-600">Tech</h2>

           
              

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tech?.map((v,i)=>(
                <>
              {/* Blog Post  */}
              <div className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative w-full h-60 rounded-lg overflow-hidden mb-4">
                  <img
                    src={v?.image}
                    alt= {v?.title}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <h4 className="text-xl font-semibold">{v?.title}</h4>
                <Link href={`/blogdetails/${v?._id}`} className="mt-4 text-red-600 font-semibold hover:text-red-800 transition-all duration-200">Read More</Link>
              </div>

              </>
))}
            </div>
     
          </div>
        </section>
      </main>

      
    </div>
    </div>
  )
}

export default page
