import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: {
        type:String,
        unique:true

    }
},{timestamps:true})

const blogSchema = new mongoose.Schema ({
    title: {
        type:String,
        required: true
    },
    desc: {
        type:String
    },
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    image:{
            type:String
        },
},{timestamps:true})

const userSchema = new mongoose.Schema ({
    fullname: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: String,
        required: true,
        unique: true,
      },
},{ timestamps: true })

const categoryModel = mongoose.models?.categories || mongoose.model ("categories",categorySchema);

const blogModel = mongoose.models?.blogs || mongoose.model ("blogs",blogSchema)

const userModel = mongoose.models?.users || mongoose.model ("users",userSchema)

export {categoryModel , blogModel , userModel};