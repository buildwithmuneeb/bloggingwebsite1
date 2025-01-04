
import dbConnect from "@/backend/dbConnnect";
import { userModel } from "@/backend/models";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Connect to the database

// To Find all Users
export async function GET(req) {
  await dbConnect();
  try {
    const users = await userModel.find(); // Corrected to use find()
    return NextResponse.json(
      {
        success: true,
        message: users,
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


// To add new user
export async function POST(req) {
  await dbConnect();
  console.log("Database connected");

  try {
    const body = await req.json();
    console.log("Request Body:", body);

    // Validate request body
    if (!body.username || !body.email || !body.phone || !body.password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 } // Bad Request
      );
    }

    // Check for existing username, email, or phone
    const existingUser = await userModel.findOne({
      $or: [
        { username: body.username },
        { email: body.email },
        { phone: body.phone },
      ],
    });
    console.log("Existing User:", existingUser);

    if (existingUser) {
      let errorMessage = "";
      if (existingUser.username === body.username) {
        errorMessage = "Username already exists.";
      } else if (existingUser.email === body.email) {
        errorMessage = "Email already exists.";
      } else if (existingUser.phone === body.phone) {
        errorMessage = "Phone number already exists.";
      }
      return NextResponse.json(
        {
          success: false,
          message: errorMessage,
        },
        { status: 409 } // Conflict status code
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(body.password, 10); // 10 is the salt rounds
    console.log("Hashed Password:", hashedPassword);

    // Replace plain password with hashed password
    body.password = hashedPassword;

    // Create a new user if no conflicts
    const user = await userModel.create(body);
    console.log("New User Created:", user);

    return NextResponse.json(
      {
        success: true,
        message: user,
      },
      { status: 201 } // Created status code
    );
  } catch (error) {
    console.error("Error occurred:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
