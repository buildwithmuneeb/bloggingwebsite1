"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'



    

const page = () => {


  const [blogs, setBlogs] = useState([])

    const getAllBlog = async()=>{
      try {
        const blogs = await axios.get("/api/blog",{cache:"no-store"})
        const allBlogs = blogs.data
        setBlogs(allBlogs?.message)
        // return allBlogs
        // console.log(allBlogs)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
      getAllBlog()

    },[])

  //  console.log(getAllBlog())

    const categories = ["Web Development", "Design & UX", "Tutorials", "JavaScript", "React"];
    const recentPosts = [
      "10 Tips for Effective Web Design",
      "Mastering JavaScript Closures",
      "How to Build a Portfolio with Next.js",
      "Understanding Redux Toolkit",
    ];
  return (
    <div>
      <div className="bg-black text-white min-h-screen font-sans">
      

      {/* Blog Page Content */}
      <main className="container mx-auto py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Blog Posts Section */}
        <section className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Example Blog Post */}
          {blogs.map((v, i) => (
              <div key={i} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative w-full h-56 rounded-lg overflow-hidden mb-4">
                  <img
                    src={v?.image}
                    alt={v?.title}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <h4 className="text-xl font-semibold line-clamp-2">{v?.title}</h4>
                <p className="text-gray-400 mt-2 line-clamp-2">
                  {v?.desc}
                </p>
                <Link href={`/blogdetails/${v?._id}`} className="mt-4 text-red-600 font-semibold hover:text-red-800 transition-all duration-200">Read More</Link>
                
              </div>
            ))}
        </section>

        {/* Sidebar Section */}
        <aside className="lg:col-span-1">
          {/* Search Bar */}
          <div className="bg-gray-900 p-6 rounded-lg mb-8">
            <h4 className="text-2xl font-semibold mb-4 text-red-600">Search</h4>
            <div className="flex">
              <input
                type="text"
                placeholder="Search blogs..."
                className="px-4 py-2 text-black rounded-l-lg w-full"
              />
              <button className="bg-red-600 text-white px-6 py-2 rounded-r-lg hover:bg-red-500 transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Categories Section */}
          <div className="bg-gray-900 p-6 rounded-lg mb-8">
            <h4 className="text-2xl font-semibold mb-4 text-red-600">Categories</h4>
            <ul className="space-y-2">
             
             {blogs?.map((v,i)=>(
                <li key={i}>
                  <p  className="hover:text-red-500">
                    {/* {v?.category?.title} */}
                    {/* console.log(v?.title) */}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Posts Section */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h4 className="text-2xl font-semibold mb-4 text-red-600">Recent Posts</h4>
            <ul className="space-y-2">
              {blogs?.slice(0, 5).map((v, i) => (
                <li key={i}>
                  <Link href={`/blogdetails/${v?._id}`} className="hover:text-red-500 line-clamp-1">
                    {v?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>

      
    </div>
    </div>
  )
}

export default page
