import express from 'express';
import {Request, Response} from 'express';


const app = express()
const port = process.env.PORT || 8080

app.get('/health', async (req: Request, res: Response) => {
    res.status(200).send('Root of API is up');
})
app.listen(port, () => {
    console.log(`Server is Running on port ${port}`)
    console.log(`press CTRL+C to stop server`)
})