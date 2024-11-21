export function formatDateToDDMMYYYYHM(dateString: any, timeZone: string = 'Asia/Kolkata'): string {
  // Create a new Date object from the provided date string
  const date = new Date(dateString);

  // Use Intl.DateTimeFormat for better time zone handling and formatting
  const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone, // Specify the time zone (default is IST)
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // Use 24-hour format
  });

  // Format the date
  // const formattedDate = formatter.format(date);

  // Format output to match "dd-mm-yyyy hh:mm:ss"
  return String(date);
}
