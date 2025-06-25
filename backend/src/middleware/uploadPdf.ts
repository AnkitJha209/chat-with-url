import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the upload directory exists
const uploadDir = path.join(process.cwd(), 'dist', 'upload');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Get original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const finalName = uniqueSuffix + (ext === '.pdf' ? ext : '.pdf'); // Ensure .pdf
        cb(null, finalName);
    },
});

// File filter to accept only PDFs
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'));
    }
};

const upload = multer({ storage, fileFilter }).single('pdf');

export const uploadPdfMiddleware = (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err: any) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        // console.log(`PDF uploaded successfully: ${req.file.path}`);
        req.body.filename = req.file.filename; 
        // console.log(`File path: ${req.file.filename}`);
        req.body.pdfPath = req.file.path;
        next();
    });
};