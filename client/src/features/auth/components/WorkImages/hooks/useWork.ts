import { useState, useEffect } from 'react';
import { UseWorkProps } from '../../../types';

export default function useWork({ getValues, setValue, toggle }: UseWorkProps) {
    const [previews, setPreviews] = useState<string[]>([]);

    useEffect(() => {
        return () => {
            previews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, []);

    const handleAddFiles = (files: FileList | null) => {
        const images = getValues('images') || [];
        if (files) {
            const fileArray = Array.from(files);
            setPreviews((prev) => [...prev, ...fileArray.map((file) => URL.createObjectURL(file))]);
            setValue('images', [...images, ...fileArray], { shouldValidate: true });
        }
    };

    const handleDeleteFile = (fileIndex: number) => {
        const images = getValues('images') || [];
        setPreviews((prev) => prev.filter((_, index: number) => index !== fileIndex));
        setValue('images', images.filter((_: number, index: number) => index !== fileIndex), { shouldValidate: true });
    };

    const handleAddWork = () => {
        const workTitle = getValues('workTitle');
        const workDescription = getValues('workDescription');
        const images = getValues('images') || [];

        if (!images.length) {
            console.error('No images selected or invalid format');
            return;
        }

        const newWork = { workTitle, workDescription, images };
        const work = getValues('work') || [];
        setValue('work', [...work, newWork], { shouldValidate: true });

        setPreviews([]);
        setValue('workTitle', '');
        setValue('workDescription', '');
        setValue('images', '');

        toggle();
    };

    const handleDeleteWork = (workIndex: number) => {
        const work = getValues('work') || [];
        setValue("work", work.filter((_: number, index: number) => index !== workIndex), { shouldDirty: true, shouldValidate: true });
    };

    return {
        previews,
        handleAddFiles,
        handleDeleteFile,
        handleAddWork,
        handleDeleteWork
    };
};