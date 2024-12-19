import { UploadedFile } from "../types";
import { UserRequest } from "../types/userTypes";
import { handleFileUploads } from "./fileUpload";

export const formatUserData = async (data: UserRequest, files: any) => {
    let {
        name,
        email,
        password,
        role,
        phoneNumber,
        location,
        group,
        experience,
        description,
        numberOfWorkers,
        numberOfServiceBays,
        work,
    } = data;

    const { uploadedWorkImages, uploadedProfileImage }: any = await handleFileUploads(
        files as { [fieldname: string]: UploadedFile[] } | undefined
    );

    let workWithImages = []

    if (role === 'serviceProvider') {
        work = JSON.parse(work);
        group = []

        const groupedWorkImages = Array.isArray(work)
            ? work.map((_, index) => {
                const imagesForWork = uploadedWorkImages.splice(0, (work[index] as any).images?.length || 0);
                return imagesForWork;
            })
            : [];

        workWithImages = Array.isArray(work)
            ? work.map((workItem, index) => ({
                ...workItem,
                images: groupedWorkImages[index] || [],
            }))
            : [];
    }

    const commonData = {
        name,
        email,
        password,
        profileImage: uploadedProfileImage,
        role,
        phoneNumber,
        location
    };

    const serviceProviderDetails = {
        numberOfWorkers,
        numberOfServiceBays,
        description,
        group,
        experience,
        work: workWithImages,
    };

    return role === 'customer' ? { ...commonData } : { ...commonData, serviceProviderDetails }
}