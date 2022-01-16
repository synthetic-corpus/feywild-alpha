import  * as User from '../interfaces/user.interface';
import { HttpReplyMessage } from '../interfaces/responses.interface'


export async function createUser(userId: String){
    const reply: HttpReplyMessage = {
        code: 201,
        message: `New User sucessfully created`
    }
    return reply
}

export async function getUser(userId: String){
    const reply: HttpReplyMessage = {
        code: 200,
        message: `Got User with userID... ${userId}`
    }
    return reply
}

export async function patchUser(userId: String, update: User.UserPatch){
    const reply: HttpReplyMessage = {
        code: 202,
        message: `Patched UserId: ${userId} successfully`,
        data: update
    }
    return reply
}

export async function deleteUser(userId: String){
    const reply: HttpReplyMessage = {
        code: 202,
        message: `Deleted user ${userId} sucessfully`
    }
    return reply
}