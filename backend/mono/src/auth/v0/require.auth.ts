import {Request, Response} from 'express'
import {NextFunction} from 'connect'
import { verifyToken } from './authUtils'
import { JwtPayload } from '../interfaces';


export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.headers || !req.headers.authorization){
        return res.status(401).send({message: 'No authorization headers.'})
    }

    const tokenBearer = req.headers.authorization.split(' ');
    if (tokenBearer.length != 2) {
        return res.status(401).send({message: 'Malformed token.'});
    }


    try{
        // If it Verified, go on to the actual HTTP call with Next
        const jwtToken: JwtPayload = await verifyToken(req.headers.authorization)
        return next()
    } catch(e){
        // if Not Verified, through a 403
        return res.status(403).send({message: 'Token not Verified.'});
    }
}

