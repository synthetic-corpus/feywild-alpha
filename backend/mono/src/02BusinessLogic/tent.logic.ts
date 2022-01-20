import * as Tent from '../interfaces/tent.interface';
// import * as DB from '../03data/tent.mongo';
import { convertUserId } from '../03data/convertUserId';
import { HttpReplyMessage } from '../interfaces/responses.interface'

export async function createTent(userId: String, tentPost: Tent.Tent): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    tentPost._user_id = db_uuid
    // const reply: HttpReplyMessage = await DB.createTent(tentPost);
    // return reply
}

export async function getTent(userId: String, tentId: String): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    // const reply: HttpReplyMessage = await DB.retrieveTent(db_uuid, tentId)
    // return reply
}

export async function patchTent(userId: String, tentId: String, update: User.UserPatch): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    // const reply: HttpReplyMessage = await DB.updateTent(db_uuid,tentId,update)
    // return reply
}

export async function deleteTent(userId: String, tentId: String): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    // const reply: HttpReplyMessage = await DB.deleteTent(db_uuid, tentId)
    // return reply
}