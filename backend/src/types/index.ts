import { Request } from "express";

export interface UploadedFile {
    filename: string;
    path: string,
    buffer: Buffer
}

export interface PrivateRequest extends Request {
    id?: string
}