import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs/promises';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { embedding, textspliter } from '../utils/langchainfn';
import { QdrantVectorStore } from '@langchain/qdrant';


export const ingestPdf = async (req: Request, res: Response) => {
    try {
        const { filename } = req.body;
        // console.log(`Received file: ${filename}`);
        const uploadDir = path.join(__dirname, '..', 'upload');
        const tempFilePath = path.join(uploadDir, filename);
        // console.log(`Temporary file path: ${tempFilePath}`);
        const loader = new PDFLoader(tempFilePath);
        const allDocs = await loader.load()
        // console.log(`Loaded ${allDocs.length} documents from PDF.`);
        // console.log(`Splitting documents...`, allDocs[0]);
        const text = await textspliter.splitDocuments(allDocs)

        await QdrantVectorStore.fromDocuments(text, embedding, {
                url: "http://localhost:6333",
                collectionName: `${filename}-vectors`,
            });

        console.log(`Ingestion of PDF completed successfully.`);

        res.status(200).json({ message: 'PDF ingested successfully', collectionName: `${filename}-vectors` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to ingest PDF', details: (error as Error).message });
    }
};