import { blogModel } from "@/backend/models";
import dbConnect from "@/backend/dbConnnect";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await dbConnect();

  const { id } = params;

  try {
    const singleBlog = await blogModel.findById(id).populate("category");
    if (!singleBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: singleBlog,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Error fetching blog: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const delBlog = await blogModel.findByIdAndDelete(id);
    if (!delBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: delBlog,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Error deleting blog: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const bodyData = await req.json();
    const updatedBlog = await blogModel.findByIdAndUpdate(id, bodyData, {
      new: true,
    });
    if (!updatedBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: updatedBlog,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: `Error updating blog: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
