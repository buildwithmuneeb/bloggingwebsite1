import dbConnect from "@/backend/dbConnnect";
import { blogModel } from "@/backend/models";
import {  NextResponse } from "next/server";

// Connect to the database

// To Find all blogs
export async function GET(req) {
  await dbConnect();
  try {
    const blogs = await blogModel.find().populate('category');;
    return NextResponse.json(
      {
        success: true,
        message: blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
    {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// to find one blog

// 
  

// To add new blog
export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const blog = await blogModel.create(body);
    return NextResponse.json(
        {
        success: true,
        message: blog,
      }
    ,
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json({
          success: false,
          message: "Title is already in use!",
        },
        { status: 409 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
