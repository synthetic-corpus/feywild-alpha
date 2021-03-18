import {Router, Request, Response} from 'express';

const router: Router = Router()

router.get('/health', async (req: Request, res: Response) => {
    res.status(200).send('Campaign API is up');
})

router.post('/', async (req: Request, res: Response) => {
    res.status(200).send({reply:'POST method is up', calandar: 'Campaign'});
})

router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    res.status(200).send({reply: `GET ONE is up with ID of ${id}`, calandar: 'Campaign'})
})

router.get('/', async (req: Request, res: Response) => {
    res.status(200).send({reply:'GET ALL method is up', calandar: 'Campaign'});
})

router.patch('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    res.status(200).send({reply: `PATCH is up with ID of ${id},`, calandar: 'Campaign'})
})

router.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    res.status(200).send({reply: `DELETE is up with ID of ${id}`, calandar: 'Campaign'})
})

export const CampaignRouterV0: Router = router