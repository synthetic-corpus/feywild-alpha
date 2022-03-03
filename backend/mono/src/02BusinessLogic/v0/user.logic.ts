import  * as User from '../../interfaces/user.interface';
import * as DB from '../../03data/user.mongo';
import { convertUserId } from '../../03data/convertUserId';
import { HttpReplyMessage } from '../../interfaces/responses.interface'


export async function createUser(userId: String): Promise<HttpReplyMessage>{
    const reply: HttpReplyMessage = await DB.createUser(userId);
    return reply
}

export async function getUser(userId: String): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const reply: HttpReplyMessage = await DB.retrieveUser(db_uuid)
    return reply
}

export async function patchUser(userId: String, update: User.UserPatch): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const reply: HttpReplyMessage = await DB.updateUser(db_uuid,update)
    return reply
}

export async function deleteUser(userId: String): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const reply: HttpReplyMessage = await DB.deleteUser(db_uuid)
    return reply
}