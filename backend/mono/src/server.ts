import express from 'express';
import {Request, Response} from 'express';
import { CampaignRouterV0 } from './01Http/v0/campaign.router';
import { FeywildRouterV0 } from './01Http/v0/feywild.router';
import { HarptosRouterV0 } from './01Http/v0/harptos.router';


const app = express()
const port = process.env.PORT || 8080

app.use(express.json())

/* Make way for the Routers */
app.use('/v0/feywild', FeywildRouterV0)
app.use('/v0/harptos', HarptosRouterV0)
app.use('/v0/campaign', CampaignRouterV0)

app.get('/health', async (req: Request, res: Response) => {
    res.status(200).send('Root of API is up');
})
app.listen(port, () => {
    console.log(`Server is Running on port ${port}`)
    console.log(`press CTRL+C to stop server`)
})