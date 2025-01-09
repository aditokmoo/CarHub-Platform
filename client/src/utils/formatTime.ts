import { differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';

export const formatTimestamp = (timestamp: string | number | Date): string => {
    const date = new Date(timestamp);
    const now = new Date();

    const minutes = differenceInMinutes(now, date);
    const hours = differenceInHours(now, date);
    const days = differenceInDays(now, date);

    if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'}`;
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'}`;
    return `${days}d`;
};