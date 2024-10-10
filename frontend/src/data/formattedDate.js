export const formattedDate = (date) => {
    if (!date) {
      return "Add Date Of Birth"; // Return a default message if date is null or undefined
    }
  
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return "Invalid Date"; // Return a message for an invalid date
    }
  
    return parsedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
  