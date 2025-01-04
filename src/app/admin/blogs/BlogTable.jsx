import DeleteBl from "@/components/deleteBl";
import Link from "next/link";
import React from "react";

async function getBlogs() {
  try {
    var blogData = await fetch("http://localhost:3000/api/blog/",{cache:"no-store"});
    blogData = await blogData.json();

    if (!blogData?.success) {
      return;
    }

    return blogData;
  } catch (error) {
    console.log(error);
  }
}

const BlogTable = async () => {
  var blogData = await getBlogs();
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Blog Titles
              </th>
              
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          {blogData?.message.map((v, i) => {
            return (
              <tbody key={i}>
                <tr className="bg-white border-b hover:bg-gray-50 ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {v.title}
                  </th>
                  
                  <td className="px-6 py-4">{v?.category?.title}</td>
                  
                  <td className="px-6 py-4 text-right flex gap-2">
                  <DeleteBl id={v._id}/>
                    <Link
                      href={`/admin/blogs/${v?._id}`}
                      className="font-medium text-blue-600  hover:underline "
                    >
                      
                      Edit
                    </Link>

                    <Link href={`/blogdetails/${v?._id}`}><i class="fa-regular fa-eye hover:text-green-300"></i></Link>

                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
        <Link href={"/admin/blogs/blogsform"} className="p-3 inline-block bg-blue-600 hover:bg-blue-700  text-white rounded-md mt-2"> Add More Blogs</Link>
      
    </div>
  );
};

export default BlogTable;
