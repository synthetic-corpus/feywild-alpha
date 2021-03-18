import { Request } from 'express'
import { decode } from 'jsonwebtoken'
import { JwtPayload } from '../interfaces';

export function getUserId(req: Request) {
    const authorization = req.headers.authorizataion as string
    if(authorization){
        const split: string[] = authorization.split(" ")
        const jwtToken = split[1]
        return parseUserId(jwtToken)
    }
}

export function parseUserId(jwtToken: string): string {
    const decodedJwt = decode(jwtToken) as JwtPayload
    
    return decodedJwt.sub
  }