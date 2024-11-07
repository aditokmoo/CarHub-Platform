import { UploadedFile } from "../types";

export const handleFileUploads = (files: { [fieldname: string]: UploadedFile[] } | undefined) => {
    const workImages = files?.['workImages'] ? files['workImages'].map((file) => file.filename) : [];
    const profileImage = files?.['profileImage'] && files['profileImage'][0] ? files['profileImage'][0].filename : null;
    return { workImages, profileImage };
};