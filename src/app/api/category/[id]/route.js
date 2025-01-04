import dbConnect from "@/backend/dbConnnect";
import { categoryModel } from "@/backend/models";
import {  NextResponse } from "next/server";

dbConnect()

export async function DELETE(req , {params}){
    const {id} = params
    try {
        const delCategories = await categoryModel.findByIdAndDelete(id)
        if (!delCategories) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Category Not Found"
                },
                {
                    status: 404
                }
            )
        }
        return NextResponse.json(
            {
                success: true,
                message: delCategories
            },
            {
                status: 200
            }
        )
    } catch (error) {
       return NextResponse.json (
            {
                success:false,
                message: error.message,
            },
            {
                status: 500
            }
        )

        }
    }


export async function PUT(req, {params}) {
    
    const {id} = params
    try {
        const bodyData = await req.json()
        const updateCategory = await categoryModel.findByIdAndUpdate(
            id, 
            { ...bodyData},
            {new:true})
            if(!updateCategory){
                return NextResponse.json(
                    {
                        success: false,
                        message: "Category Not Found"
                    },
                    {
                        status: 404
                    }
                )    
            }
        return NextResponse.json(
            {
                success: true,
                message: updateCategory
            },
            {
                status: 200
            }
        )    
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message
            },
            {
                status: 500
            }
        )
    }
    
}
