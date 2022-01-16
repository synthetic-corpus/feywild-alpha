import Mongoose from "mongoose";
import { MongoDB } from "./mongo.db";
import { HttpReplyMessage } from '../interfaces/responses.interface'
import { UserModel } from './schemas/schema'
import { UserPatch } from '../interfaces/user.interface'

MongoDB.then(
    () => {console.log("Connected to Database")},
    (err)=>{console.error(`Failed to Connect to Database! \n ${err}`)}
)

export async function createUser(userId: String): Promise<HttpReplyMessage>{
    const newUser = new UserModel({_authID: userId})
    try{
        newUser.save()
    }catch(e){
        const message: HttpReplyMessage = {
            code: 503,
            message: "Internal server side error" 
        }
        console.error(`Could Not Write user to Database \n ${e}`)
        return message
    }finally{
        const message: HttpReplyMessage = {
            code: 201,
            message: "New User Created!"
        }
        return message
    }
}

export async function retrieveUser(userId: String): Promise<HttpReplyMessage>{
    try{
        const user = await UserModel.findOne({userId: userId}).exec()
        if(user){
            const reply: HttpReplyMessage = {
                code: 200,
                message: "Found the user!",
                data: user
            }
            return reply
        }else{
            throw new Error(`No user Found with Id: ${userId}`)
        }
    }catch(e){
        const reply: HttpReplyMessage = {
            code: 404,
            message: "User was not Found!"
        }
        console.error(`Database Related Error \n ${e}`)
        return reply
    }
}

export async function updateUser(userId: String, userPatch: UserPatch): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage;
    try{
        const updatedUser = await UserModel.findByIdAndUpdate(userId,userPatch)
        if (updatedUser){
            const data: UserPatch = {
                name: updatedUser.name,
                tier: updatedUser.tier
            }
            reply = {
                code: 201,
                message: "user updated",
                data: data
            }
            updatedUser.save()
        }else{
            reply = {
                code: 404,
                message: "Unable to updated user! Possibly Not found!"
            }
        }
        
    }catch(e){
        console.error(`error updating user! \n ${e}`)
        reply = {
            code: 500,
            message: "Unable to Update User!"
        }
    }
    
    
    return reply;
}

export async function deletedUser(userId: String): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    try{
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        if(deletedUser){
            reply = {
                code: 202,
                message: "Requested User has been removed!"
            }
            console.log(`Deleted User _id: ${deletedUser._id}`)
        }else{
            reply = {
                code: 404,
                message: "Could not Find user to delete!"
            }
        }
    }catch(e){
        console.error(`error updating user! \n ${e}`)
        reply = {
            code: 500,
            message: "Unable to Deleted User!"
        }
    }
    return reply
}