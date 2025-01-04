import dbConnect from "@/backend/dbConnnect";
import { categoryModel } from "@/backend/models";
import {  NextResponse } from "next/server";

// Connect to the database

export async function GET(req) {
  dbConnect();
  try {
    const categories = await categoryModel.find();
    return NextResponse.json(
      {
        success: true,
        message: categories,
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

export async function POST(req) {
  dbConnect();
  try {
    const body = await req.json();
    const category = await categoryModel.create(body);
    return NextResponse.json(
        {
        success: true,
        message: category,
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
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
