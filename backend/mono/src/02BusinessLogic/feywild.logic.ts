import * as Feywild from '../interfaces/feywild.interface';
import * as DB from '../03data/feywild.mongo';
import { convertUserId } from '../03data/convertUserId';
import { HttpReplyMessage } from '../interfaces/responses.interface'

export async function createHarptos(userId: string, feywildPost: Feywild.FeywildCalendarHttp): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const post: Feywild.FeywildCalendar = {
        _user_id: db_uuid,
        ...feywildPost
    }
    const reply: HttpReplyMessage = await DB.createFeywild(post);
    return reply
}

export async function getFeywild(userId: string, feywildId: string): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    console.log("Converted Id = ",db_uuid)
    const reply: HttpReplyMessage = await DB.retrieveHarptos(db_uuid, feywildId)
    return reply
}

export async function getAllFeywild(userId: String): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    console.log("Converted Id = ",db_uuid)
    const reply: HttpReplyMessage = await DB.retrieveAllFeywild(db_uuid)
    return reply
}

export async function updateFeywild(userId: String, feywildId: String, feywildPatch: Feywild.FeywildUpdate): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const reply: HttpReplyMessage = await DB.updateFeywild(db_uuid,feywildId,feywildPatch)
    return reply
}

export async function deleteHarptos(userId: String, feywildId: String): Promise<HttpReplyMessage>{
    const db_uuid = await convertUserId(userId)
    const reply: HttpReplyMessage = await DB.deleteFeywild(db_uuid, feywildId)
    return reply
}