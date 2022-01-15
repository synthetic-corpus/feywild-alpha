import {Router, Request, Response} from 'express';

const router: Router = Router()

router.get('/health', async (req: Request, res: Response) => {
    res.status(200).send('Users API is up');
})

router.post('/', async (req: Request, res: Response) => {
    res.status(200).send({reply:'POST method is up'});
})

router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    res.status(200).send({reply: `GET a user is up with ID of ${id}`})
})

router.patch('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    res.status(200).send({reply: `PATCH is up with user ID of ${id},`})
})

router.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    res.status(200).send({reply: `DELETE is up with ID of ${id}`})
})

export const UserRouterV0: Router = router