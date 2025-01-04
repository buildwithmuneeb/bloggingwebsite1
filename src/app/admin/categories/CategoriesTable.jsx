import DeleteCa from "@/components/deleteCa";
import Link from "next/link";
import React from "react";

async function getCategories() {
  try {
    var categoriesData = await fetch("http://localhost:3000/api/category", {cache:"no-store"});
    categoriesData = await categoriesData.json();

    if (!categoriesData?.success) {
        return;
      }

    return categoriesData;
  } catch (error) {
    console.log(error);
  }
}

const CategoriesTable = async () => {
  var categoriesData = await getCategories();
  return (
    <div>
      <div className="relative overflow-x-auto">
        
            <table  className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-stone-950 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Category name
                  </th>
                  <th scope="col" class="px-6 py-3">
                Quantity
              </th>
              <th scope="col" class="px-6 py-3">
                Delete
              </th>
              <th scope="col" class="px-6 py-3">
                Update
              </th>
                </tr>
              </thead>
              {categoriesData?.message.map((v, i) => {
          return (
              <tbody key={i}>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium capitalize text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {v.title}
                  </th>
                  <td class="px-6 py-4">Silver</td>
              <td class="px-6 py-4"> <DeleteCa id={v._id} /> </td>
              <td class="px-6 py-4">$2999</td>
                </tr>
              </tbody>
               );
            })}
            </table>

            <Link href={"/admin/categories/categoriesform"} className="p-3 inline-block bg-blue-600 hover:bg-blue-700  text-white rounded-md mt-2"> Add More Categories</Link>
         
      </div>
    </div>
  );
};

export default CategoriesTable;
