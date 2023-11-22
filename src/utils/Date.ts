export const dateConverter = (date: string) => {
  let parsedDate = new Date(date);
  const day = parsedDate.getUTCDate();
  const month = parsedDate.getUTCMonth() + 1;
  const year = parsedDate.getUTCFullYear();
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  return formattedDate;
};
export const dateFormatter = (value: string) => {
  const day = value.substring(0, 2);
  const month = value.substring(2, 4);
  const year = value.substring(4, 8);
  return `${day}/${month}/${year}`;
}
export const dateTimeFormatter = (value: any) => {
  var dateParts = value.split("/");
  var dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
  var formattedDate = dateObject
  return formattedDate;
} 