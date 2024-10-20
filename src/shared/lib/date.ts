import {
    addMonths,
    addYears,
    endOfWeek,
    format,
    startOfMonth,
    startOfWeek,
    startOfYear,
} from "date-fns";

const getWeekRange = () => {
    const now = new Date();

    const startDate = startOfWeek(now, { weekStartsOn: 1 });
    const endDate = startOfWeek(endOfWeek(startDate), { weekStartsOn: 1 });

    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");

    return {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
    };
};

const getYearRange = () => {
    const now = new Date();

    const startDate = startOfYear(now);
    const endDate = startOfYear(addYears(startDate, 1));

    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");

    return {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
    };
};

const getMonthRange = () => {
    const now = new Date();

    const startDate = startOfMonth(now);
    const endDate = startOfMonth(addMonths(startDate, 1));

    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");

    return {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
    };
};

export { getYearRange, getWeekRange, getMonthRange };
