import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import { QdrantVectorStore } from "@langchain/qdrant";
import { Request, Response } from "express";
import { embedding, textspliter } from "../utils/langchainfn";

export const ingestUrl = async (req: Request, res: Response) => {
    const { url } = req.body;
    console.log(url)
    const loader = new PuppeteerWebBaseLoader(url);
    const domain_name = url.split("//")[1].split("/")[0];

    const allDocs = await loader.load();

    const chunks = await textspliter.splitDocuments(allDocs);

    await QdrantVectorStore.fromDocuments(chunks, embedding, {
        url: "http://localhost:6333",
        collectionName: `${domain_name}-vectors`,
    });
    console.log("Ingestion of the url done");
    res.status(200).json({
        success: true,
        message: "Ingestion done",
        collectionName: `${domain_name}-vectors`,
    });
};
