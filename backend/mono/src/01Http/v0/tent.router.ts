import {Router, Request, Response} from 'express';
import { getUserId } from '../../auth/v0/authUtils';
import * as TentLogic from '../../02BusinessLogic/tent.logic'
import { Tent, TentPatch } from '../../interfaces/tent.interface'
import { HttpReplyMessage } from '../../interfaces/responses.interface';
import { requireAuth } from '../../auth/v0/require.auth';
import { stringify } from 'querystring';


const router: Router = Router()

router.get('/health', async (req: Request, res: Response) => {
    res.status(200).send('tent API is up');
})

router.post('/', requireAuth, async (req: Request, res: Response) => {
    const id = getUserId(req) || ''
    if(!id){
        console.error(`Could not get user ID from Request  ${stringify(req.headers)}`) 
        return res.status(500).send("Problem with user identification.!")
    }
    const newTent: Tent = req.body
    const reply: HttpReplyMessage = await TentLogic.createTent(id,newTent)
    return res.status(reply.code).send(reply)
})

router.get('/:id', requireAuth, async (req: Request, res: Response) => {
    const tent_id = req.params.id
    const id = getUserId(req) || ''
    if(!id){
        console.error(`Could not get user ID from Request  ${stringify(req.headers)}`) 
        return res.status(500).send("Problem with user identification.!")
    }
    const reply: HttpReplyMessage = await TentLogic.getTent(id,tent_id)
    return res.status(reply.code).send(reply)
})

router.get('/', requireAuth, async (req: Request, res: Response) => {
    res.status(200).send({reply:'GET ALL method is up', api: 'tent'});
})

router.patch('/:id', requireAuth, async (req: Request, res: Response) => {
    const id = req.params.id
    const user_id = req.params.user_id
    const patch: TentPatch = req.body
    const reply = await TentLogic.patchTent(user_id,id,patch)
    return res.status(reply.code).send(reply)
})

router.delete('/:id', requireAuth,async (req: Request, res: Response) => {
    const id = req.params.id
    const user_id = req.params.user_id
    const reply = await TentLogic.deleteTent(user_id,id)
    return res.status(reply.code).send(reply)
})

export const TentRouterV0: Router = router