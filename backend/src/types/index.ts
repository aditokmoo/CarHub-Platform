import { Request } from "express";

export interface UploadedFile {
    filename: string;
}

export interface PrivateRequest extends Request {
    id?: string
}