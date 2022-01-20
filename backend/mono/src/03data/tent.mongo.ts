//import Mongoose from "mongoose";
import { MongoDB } from "./mongo.db";
import { HttpReplyMessage } from '../interfaces/responses.interface'
import { TentModel } from './schemas/schema'
import { Tent, TentPatch } from "../interfaces/tent.interface";


MongoDB.then(
    () => {console.log("Connected to Database")},
    (err)=>{console.error(`Failed to Connect to Database! \n ${err}`)}
)

export async function createTent(tent: Tent): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    try{
        const newTent = new TentModel(tent)
        await newTent.save()
        reply = {code: 201,message: "Tent Created!"}
    }catch(e){
        reply = {
            code: 503,
            message: "Internal server side error" 
        }
        console.error(`Could Not Write user to Database \n ${e}`)
    }
    return reply
}

export async function retrieveTent(userId: String, TentId: String): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    try{
        const thisTent = await TentModel.findById(TentId)
        if(thisTent){
            if (userId === thisTent._user_id.toString()){
                reply = {code: 200,message: "retrieved character tent",data: thisTent}
            }else{
                reply = {code: 403,message: "You are not authorized to view this resource!"}
            }
        }else{
            reply = {code: 404,message: "No Tent found!"}
        }
    }catch(e){
        console.log(`Error on retrieving tent at database layer for tent: ${TentId} \n ${e}`)
        reply = {code: 500,message: "Internal Server Error"}
    }
    return reply
}

export async function updateTent(userId: String, tentId: String, tentPatch: TentPatch): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage;
    const query = {_id: tentId,_user_id: userId}
    try{
        const updatedTent = await TentModel.findOneAndUpdate(query,tentPatch)
        if (updatedTent){
            const data = tentPatch
            reply = {code:201, message: "Updated Tent",data: data}
        }else{
            console.log(`Could not find tent: ${tentId} with user: ${userId}. Possible auth issue!`)
            reply = {code:400, message: 'Unable to find tent or match with user'}
        }
    }catch(e){
        console.log(`Database Layer error: Could not retrieve tent: ${tentId} with user: ${userId} \n ${e}`)
        reply = {code: 500, message: "Internal Server Error"}
    }
    return reply
}

export async function deleteTent(userId: String, tentId: String): Promise<HttpReplyMessage>{
    let reply: HttpReplyMessage
    const query = {_id: tentId,_user_id: userId}
    try{
        const deletedTent = await TentModel.findOneAndDelete(query)
        if (deletedTent){
            const data = deletedTent
            reply = {code:201, message: "Removed Tent Tent",data: data}
        }else{
            console.log(`Could not find tent: ${tentId} with user: ${userId}. Possible auth issue!`)
            reply = {code:400, message: 'Unable to find tent or match with user'}
        }
    }catch(e){
        console.log(`Database Layer error: Could not Deleted tent: ${tentId} with user: ${userId} \n ${e}`)
        reply = {code: 500, message: "Internal Server Error"}
    }
    return reply
}