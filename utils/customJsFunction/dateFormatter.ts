// utils/formatDate.ts
export const formatDate = (dateInput: string | Date): string => {
    let date: Date;

    // Check if the input is a string and handle different formats
    if (typeof dateInput === "string") {
        // Parse the date manually to avoid invalid parsing issues
        const [year, month, day] = dateInput.split("-");
        date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } else {
        date = new Date(dateInput); // If it's already a Date object
    }

    // Check for invalid date
    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }

    const day = date.getDate();
    const suffix =
        day % 10 === 1 && day !== 11
            ? "st"
            : day % 10 === 2 && day !== 12
                ? "nd"
                : day % 10 === 3 && day !== 13
                    ? "rd"
                    : "th";

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day}${suffix} ${month} ${year}`;
};
