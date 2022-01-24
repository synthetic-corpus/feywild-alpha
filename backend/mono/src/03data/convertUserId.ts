import { UserModel } from "./schemas/schema";

export async function convertUserId(userId: String): Promise<string>{
    try{
        const mongoUser = await UserModel.findOne({_authId: userId})
        return mongoUser._id.toString()
    }catch(e){
        console.error(`Could Not Convert an ID! ${e}`)
        return ''
    }
}