import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInMonths,
    differenceInSeconds,
} from "date-fns";

export const calculateTimeRemaining = (eventDate) => {
    const now = new Date();
    const eventDateTime = new Date(eventDate);

    const secondsRemaining = differenceInSeconds(eventDateTime, now);

    if (secondsRemaining < 0) {
        return "Evento já passou";
    }

    const minutesRemaining = differenceInMinutes(eventDateTime, now);
    const hoursRemaining = differenceInHours(eventDateTime, now);
    const daysRemaining = differenceInDays(eventDateTime, now);
    const monthsRemaining = differenceInMonths(eventDateTime, now);

    if (monthsRemaining > 0) {
        return `${monthsRemaining} mês${monthsRemaining > 1 ? "es" : ""}`;
    }

    if (daysRemaining > 0) {
        return `${daysRemaining} dia${daysRemaining > 1 ? "s" : ""}`;
    }

    if (hoursRemaining > 0) {
        return `${hoursRemaining} hora${hoursRemaining > 1 ? "s" : ""}`;
    }

    if (minutesRemaining > 0) {
        return `${minutesRemaining} minuto${minutesRemaining > 1 ? "s" : ""}`;
    }

    return `${secondsRemaining} segundo${secondsRemaining > 1 ? "s" : ""}`;
};
