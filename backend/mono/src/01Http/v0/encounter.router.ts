import {Router, Request, Response} from 'express';
import { requireAuth } from '../../auth/v0/require.auth';


const router: Router = Router()

router.get('/health', async (req: Request, res: Response) => {
    res.status(200).send('encounter API is up');
})

router.post('/', requireAuth, async (req: Request, res: Response) => {
    res.status(200).send({reply:'POST method is up', api: 'encounter'});
})

router.get('/:id', requireAuth, async (req: Request, res: Response) => {
    const id = req.params.id
    res.status(200).send({reply: `GET ONE is up with ID of ${id}`, api: 'encounter'})
})

router.get('/', requireAuth, async (req: Request, res: Response) => {
    res.status(200).send({reply:'GET ALL method is up', api: 'encounter'});
})

router.patch('/:id', requireAuth, async (req: Request, res: Response) => {
    const id = req.params.id
    res.status(200).send({reply: `PATCH is up with ID of ${id},`, api: 'encounter'})
})

router.delete('/:id', requireAuth,async (req: Request, res: Response) => {
    const id = req.params.id
    res.status(200).send({reply: `DELETE is up with ID of ${id}`, api: 'encounter'})
})

export const EncounterRouterV0: Router = router