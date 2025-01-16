import { useState, useCallback } from 'react';
import { UseWorkProps } from '../../../types';

export default function useWork({ getValues, setValue, toggle }: UseWorkProps) {
    const [previews, setPreviews] = useState<string[]>([]);

    const updatePreviews = useCallback((files: File[]) => {
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setPreviews((prev) => [...prev, ...newPreviews]);
    }, []);

    const cleanupPreviews = useCallback(() => {
        previews.forEach((url) => URL.revokeObjectURL(url));
        setPreviews([]);
    }, [previews]);

    const handleAddFiles = useCallback(
        (files: FileList | null) => {
            const images = getValues('images') || [];
            if (files) {
                const fileArray = Array.from(files);
                updatePreviews(fileArray);
                setValue('images', [...images, ...fileArray], { shouldValidate: true });
            }
        },
        [getValues, setValue, updatePreviews]
    );

    const handleDeleteFile = useCallback(
        (index: number) => {
            const images = getValues('images') || [];
            const updatedFiles = images.filter((_: File, i: number) => i !== index);
            setPreviews((prev) => prev.filter((_, i) => i !== index));
            setValue('images', updatedFiles, { shouldValidate: true });
        },
        [getValues, setValue]
    );

    const handleAddWork = useCallback(() => {
        const workTitle = getValues('workTitle');
        const workDescription = getValues('workDescription');
        const images = getValues('images') || [];

        if (!images.length) {
            console.error('No images selected or invalid format');
            return;
        }

        const newWork = {
            workTitle,
            workDescription,
            images,
        };

        const work = getValues('work') || [];
        setValue('work', [...work, newWork], { shouldValidate: true });

        cleanupPreviews();
        setValue('workTitle', '')
        setValue('workDescription', '')
        setValue('images', '')

        toggle();
    }, [getValues, setValue, toggle, cleanupPreviews]);

    return {
        previews,
        handleAddFiles,
        handleDeleteFile,
        handleAddWork,
    };
};