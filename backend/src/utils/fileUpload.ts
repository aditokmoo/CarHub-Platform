import { UploadedFile } from "../types";

export const handleFileUploads = (files: { [fieldname: string]: UploadedFile[] } | undefined) => {
    const uploadedWorkImages = files?.['images'] ? files['images'].map((file) => file.filename) : [];
    const uploadedProfileImage = files?.['profileImage'] && files['profileImage'][0] ? files['profileImage'][0].filename : null;
    return { uploadedWorkImages, uploadedProfileImage };
};