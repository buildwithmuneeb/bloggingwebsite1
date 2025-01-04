import { userModel } from "@/backend/models";
import dbConnect from "@/backend/dbConnnect";
import bcrypt from "bcryptjs"
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name:"credentials",
            credential:{},

            async authorize(credentials){
                const {email, password} = credentials

                try {
                    await dbConnect()
                    const user = await userModel.findOne({email})

                    if(!user){
                        return null
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password)

                    if(!password){
                        return null
                    }

                    return user
                } catch (error) {
                    console.log(error)
                }
            }
        })
    ],
    
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signin: "/login"
    }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}