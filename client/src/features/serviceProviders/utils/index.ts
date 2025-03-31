export const toggleFilter = (filterName: string, selectedCategory: string): string => {
    return selectedCategory === filterName ? filterName : ''
};

export const handleSlide = (direction: 'left' | 'right', currentSlide: number, step = 150, maxRightOffset = -40): number => {
    if (direction === 'left') {
        return Math.min(currentSlide + step, 20);
    } else {
        return Math.max(currentSlide - step, maxRightOffset);
    }
};
