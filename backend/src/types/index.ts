import { Request } from "express";

export interface UploadedFile {
    filename: string;
    path: string,
}

export interface PrivateRequest extends Request {
    id?: string
}