import { User, Work } from "../types";

export const formatUserData = (data: User) => {
    const { name, email, password, profileImage, role, phoneNumber, location, group, experience, description, numberOfWorkers, numberOfServiceBays, work } = data;

    const commonData = {
        name,
        email,
        password,
        profileImage,
        role,
        phoneNumber,
        location: typeof location === 'string' ? location : location?.value
    };

    const serviceProviderDetails = {
        group,
        experience,
        description,
        numberOfWorkers,
        numberOfServiceBays,
        rating: {
            average: 0,
            count: 0,
        },
        work: work?.map((workItem: Work) => ({
            workTitle: workItem.workTitle,
            workDescription: workItem.workDescription,
            images: workItem.images,
        })) || [],
    };

    if (role === 'customer') {
        return {
            ...commonData,
        };
    }

    if (role === 'serviceProvider') {
        return {
            ...commonData,
            ...serviceProviderDetails
        };
    }

    return commonData;
};