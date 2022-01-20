import { MongoDB } from "./mongo.db";
import { UserModel } from "./schemas/schema";
import { HttpReplyMessage } from "../interfaces/responses.interface";

MongoDB.then(
    () => {console.log("Connected to Database")},
    (err)=>{console.error(`Failed to Connect to Database! \n ${err}`)}
)

export async function convertUserId(userId: String): Promise<String>{
    try{
        const mongoUser = await UserModel.findOne({_authId: userId})
        return mongoUser._id.toString()
    }catch(e){
        console.error(`Could Not Convert an ID! ${e}`)
        return ''
    }
}