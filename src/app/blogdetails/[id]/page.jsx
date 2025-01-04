import BackButton from "@/components/backButton";
import React from "react";

const Page = async ({params}) => {
    // console.log(params)
    const id = params.id


  async function getOneBlog() {
    
      var data = await fetch(`http://localhost:3000/api/blog/${id}`, { cache: "no-store" });
      data = await data.json();

      
      if (!data?.success) {
        return;
      }

      return data.message
   
  }

  const blogDetails = await getOneBlog();
  // console.log(blogDetails)
  return (
    <div>
      <BackButton/>
      
        {/* {JSON.stringify(params)} */}
      <div className="max-w-3xl mx-auto p-6">
        {/* Featured Image */}
        <div className="mb-6">
          <img
            // src="https://via.placeholder.com/1200x600"
            src={blogDetails?.image || "https://via.placeholder.com/1200x600"}
            alt="Featured Image"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Blog Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {blogDetails?.title}
        </h1>

        {/* Category and Date */}
        <div className="text-sm text-gray-600 mb-4">
          <span className="font-semibold">Category:</span>
          <span className="italic"> {blogDetails?.category?.title}</span>
          <span className="mx-2">|</span>
          <span className="font-semibold">Posted on:</span>
          <span className="italic">December 10, 2024</span>
        </div>

        {/* Blog Description */}
        <div className="prose prose-lg text-gray-700 mb-6">
          {blogDetails?.desc}
        </div>

        {/* Tags */}
        <div className="mb-6">
          <span className="text-sm font-semibold text-gray-600">Tags:</span>
          <a
            href="#"
            className="inline-block bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-xs mr-2 mb-2"
          >
            HTML
          </a>
          <a
            href="#"
            className="inline-block bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-xs mr-2 mb-2"
          >
            CSS
          </a>
          <a
            href="#"
            className="inline-block bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-xs mr-2 mb-2"
          >
            JavaScript
          </a>
        </div>

        {/* Author Section */}
        <div className="flex items-center space-x-4 mb-6">
          <img
            src="https://via.placeholder.com/40"
            alt="Author"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800">John Doe</p>
            <p className="text-xs text-gray-600">Author</p>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="flex space-x-4">
          <a
            href="#"
            className="bg-blue-600 text-white py-2 px-4 rounded-full flex items-center space-x-2"
          >
            <i className="bx bx-logo-facebook"></i>
            <span>Share on Facebook</span>
          </a>
          <a
            href="#"
            className="bg-blue-400 text-white py-2 px-4 rounded-full flex items-center space-x-2"
          >
            <i className="bx bx-logo-twitter"></i>
            <span>Share on Twitter</span>
          </a>
          <a
            href="#"
            className="bg-red-600 text-white py-2 px-4 rounded-full flex items-center space-x-2"
          >
            <i className="bx bx-logo-google"></i>
            <span>Share on Google</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Page;
