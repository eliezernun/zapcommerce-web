export const dateConverter = (date: string) => {
  let parsedDate = new Date(date);

  const day = parsedDate.getUTCDate();
  const month = parsedDate.getUTCMonth() + 1; // Months are zero-based
  const year = parsedDate.getUTCFullYear();
  // Format day and month to have leading zeros if needed
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Create the formatted date string
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  return formattedDate;
};


export const dateFormatter = (value : string) =>{
        const day = value.substring(0, 2);
        const month = value.substring(2, 4);
        const year = value.substring(4, 8);
        return `${day}/${month}/${year}`;
}