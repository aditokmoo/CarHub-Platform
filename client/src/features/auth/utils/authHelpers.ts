import { RegisterRequest, User, Work } from "../types";

export const buildFormData = (credentials: RegisterRequest) => {
    const formData = new FormData();

    console.log(credentials)

    if (credentials.profileImage) {
        formData.append('profileImage', credentials.profileImage);
    }

    if (credentials.work && Array.isArray(credentials.work)) {
        const workData = credentials.work.map((work: Work) => {
            const workItem: Work = {
                workTitle: work.workTitle,
                workDescription: work.workDescription,
                images: []
            };

            if (Array.isArray(work.images)) {
                work.images.forEach((image: string) => {
                    formData.append('images', image);
                    workItem.images.push(image);
                });
            }

            return workItem;
        });

        formData.append('work', JSON.stringify(workData));
    }

    Object.entries(credentials).forEach(([key, value]) => {
        if (key !== 'profileImage' && key !== 'work') {
            formData.append(key, value);
        }
    });

    return formData;
}

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