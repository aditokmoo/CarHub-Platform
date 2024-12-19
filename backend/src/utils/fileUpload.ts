import { UploadedFile } from "../types";
import cloudinary from "./cloudinaryConfig";

export const handleFileUploads = async (
    files: { [fieldname: string]: UploadedFile[] } | undefined
) => {
    const uploadedWorkImages = files?.['images']
        ? await Promise.all(
            files['images'].map(async (file) => {
                if (file.path) {
                    const uploadResult = await cloudinary.uploader.upload(file.path);
                    return uploadResult?.secure_url || null;
                }
                return null;
            })
        )
        : [];

    const uploadedProfileImage = files?.['profileImage'] && files['profileImage'][0]
        ? (await cloudinary.uploader.upload(files['profileImage'][0].path)).secure_url
        : null;

    return { uploadedWorkImages, uploadedProfileImage };
};
