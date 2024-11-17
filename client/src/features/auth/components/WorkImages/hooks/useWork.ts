import { useState, useCallback } from 'react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

interface UseWorkProps {
    getValues: UseFormGetValues<any>;
    setValue: UseFormSetValue<any>;
    toggle: () => void;
}

const useWork = ({ getValues, setValue, toggle }: UseWorkProps) => {
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
            const workImages = getValues('workImages') || [];
            if (files) {
                const fileArray = Array.from(files);
                updatePreviews(fileArray);
                setValue('workImages', [...workImages, ...fileArray], { shouldValidate: true });
            }
        },
        [getValues, setValue, updatePreviews]
    );

    const handleDeleteFile = useCallback(
        (index: number) => {
            const workImages = getValues('workImages') || [];
            const updatedFiles = workImages.filter((_: File, i: number) => i !== index);
            setPreviews((prev) => prev.filter((_, i) => i !== index));
            setValue('workImages', updatedFiles, { shouldValidate: true });
        },
        [getValues, setValue]
    );

    const handleAddWork = useCallback(() => {
        const title = getValues('title');
        const description = getValues('description');
        const workImages = getValues('workImages') || [];

        if (!workImages.length) {
            console.error('No images selected or invalid format');
            return;
        }

        const newWork = {
            title,
            description,
            workImages,
        };

        const work = getValues('work') || [];
        setValue('work', [...work, newWork], { shouldValidate: true });

        cleanupPreviews();

        console.log('New work added:', newWork);
        toggle();
    }, [getValues, setValue, toggle, cleanupPreviews]);

    return {
        previews,
        handleAddFiles,
        handleDeleteFile,
        handleAddWork,
    };
};

export default useWork;