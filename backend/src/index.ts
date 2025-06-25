import express, { Application, urlencoded } from 'express'
import { ingestUrl } from './controllers/ingest'
import { answerQuery } from './controllers/query'
import cors from 'cors'
import { uploadPdfMiddleware } from './middleware/uploadPdf'
import { ingestPdf } from './controllers/ingestPdf'
const app: Application = express()

app.use(express.json())
app.use(urlencoded())
app.use(cors())

app.post('/url', ingestUrl)
app.post('/query', answerQuery)
app.post('/ingest-pdf', uploadPdfMiddleware, ingestPdf)

app.listen(3000)