export const toggleFilter = (filterName: string, selectedGroups: string[]): string[] => {
    return selectedGroups.includes(filterName)
        ? selectedGroups.filter((name) => name !== filterName)
        : [...selectedGroups, filterName];
};

export const handleSlide = (direction: 'left' | 'right', currentSlide: number, step = 150, maxRightOffset = -130): number => {
    if (direction === 'left') {
        return Math.min(currentSlide + step, 20);
    } else {
        return Math.max(currentSlide - step, maxRightOffset);
    }
};
