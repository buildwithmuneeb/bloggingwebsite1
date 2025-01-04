import mongoose from "mongoose";

export default async function dbConnect(){
    if(mongoose.connection.readyState >= 1){
        console.log("MondoDB is Connected!")
        return
    }
    try {
        await mongoose.connect(process.env.MONGO_URL)
    } catch (error) {
       console.log(error, "mongodb error")
       return false 
    }
}

