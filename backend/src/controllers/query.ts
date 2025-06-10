import { QdrantVectorStore } from "@langchain/qdrant";
import { Request, Response } from "express";
import { embedding } from "../utils/langchainfn";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});
export const answerQuery = async (req: Request, res: Response) => {
    const { query, collectionName } = req.body;

    const vectorDb = await QdrantVectorStore.fromExistingCollection(embedding, {
        url: "http://localhost:6333",
        collectionName: collectionName,
    });

    const search_results = await vectorDb.similaritySearch(query);
    const context = search_results
        .map(
            (result) => `
                Page Content : ${result.pageContent}\n
                Page MetaData : ${result.metadata}\n
                Page MetaData-Loc: ${result.metadata.loc}\n
                Page Source : ${result.metadata.source}
            `
        )
        .join("\n\n\n");

    const system_prompt = `
        You are a helpfull AI Assistant who asnweres user query based on the available context
        retrieved from a Website Url.
        If the user ask for examples of any code related question give them examples and also explain them what the code means using comments.
        You should only ans the user based on the following context.

        Context:
        ${context}

        Examples
        query: how to use li tags
        <ul> // unordered list
            <li>hello</li> // list tag use for listing items in unordered list and ordered list
        </ul>
    `;

    const response = await client.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
            { role: "system", content: system_prompt },
            {
                role: "user",
                content: query,
            },
        ],
    });
    res.status(200).json({
        success: true,
        message: response.choices[0].message.content,
    });
};
