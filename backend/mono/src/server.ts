import express from 'express';
import { config } from './config';
import { Request, Response } from 'express';
import { CampaignRouterV0 } from './01Http/v0/campaign.router';
import { FeywildRouterV0 } from './01Http/v0/feywild.router';
import { HarptosRouterV0 } from './01Http/v0/harptos.router';
import { UserRouterV0 } from './01Http/v0/user.router';
import { EncounterRouterV0 } from './01Http/v0/encounter.router';
import { TentRouterV0 } from './01Http/v0/tent.router';

const app = express()
const port = config.port

app.use(express.json())

/* Make way for the Routers */
app.use('/v0/feywild', FeywildRouterV0)
app.use('/v0/harptos', HarptosRouterV0)
app.use('/v0/campaign', CampaignRouterV0)
app.use('/v0/user',UserRouterV0)
app.use('/v0/encounter',EncounterRouterV0)
app.use('/v0/tent',TentRouterV0)

app.get('/health', async (req: Request, res: Response) => {
    res.status(200).send('Root of API is up');
})
app.listen(port, () => {
    console.log(`Server is Running on port ${port}`)
    console.log(`press CTRL+C to stop server`)
})