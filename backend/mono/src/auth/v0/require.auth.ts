import {Request, Response} from 'express'
import {NextFunction} from 'connect'


export function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (!req.headers || !req.headers.authorization){
        return res.status(401).send({message: 'No authorization headers.'})
    }

    const tokenBearer = req.headers.authorization.split(' ');
    if (tokenBearer.length != 2) {
        return res.status(401).send({message: 'Malformed token.'});
    }

    /* TODO: Write a the Function that will Verify a Token */

    return next();
}

