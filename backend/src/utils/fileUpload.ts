import { UploadedFile } from "../types";
import cloudinary from "./cloudinaryConfig";

export const handleFileUploads = async (
    files: { [fieldname: string]: UploadedFile[] } | undefined
) => {
    try {
        const uploadedWorkImages = files?.['images']
            ? await Promise.all(
                files['images'].map(async (file) => {
                    if (file.buffer) {
                        return new Promise((resolve, reject) => {
                            const uploadStream = cloudinary.uploader.upload_stream(
                                { resource_type: 'auto' },
                                (error, result) => {
                                    if (error) {
                                        reject(error);
                                        console.log('Work Images Upload Error:', error);
                                    } else {
                                        resolve(result?.secure_url || null);
                                    }
                                }
                            );
                            uploadStream.end(file.buffer);
                        });
                    }
                    return null;
                })
            )
            : [];

        const uploadedProfileImage = files?.['profileImage'] && files['profileImage'][0]
            ? await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: 'auto' },
                    (error, result) => {
                        if (error) {
                            reject(error);
                            console.log('Profile Image Upload Error:', error);
                        } else {
                            resolve(result?.secure_url || null);
                        }
                    }
                );
                uploadStream.end(files['profileImage'][0].buffer);
            })
            : null;

        return { uploadedWorkImages, uploadedProfileImage };
    } catch (error) {
        console.log('File Upload Error:', error);
        throw error;
    }
};