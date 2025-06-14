import express, { Application, urlencoded } from 'express'
import { ingestUrl } from './controllers/ingest'
import { answerQuery } from './controllers/query'
import cors from 'cors'
const app: Application = express()

app.use(express.json())
app.use(urlencoded())
app.use(cors())

app.post('/url', ingestUrl)
app.post('/query', answerQuery)

app.listen(3000)