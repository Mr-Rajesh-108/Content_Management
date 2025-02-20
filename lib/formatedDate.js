export default function formatedDate(dateString) {
  const date = new Date(dateString);
  
   // Extract date components
  const day = ("0" + date.getDate()).slice(-2);
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  // Extract time components
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  // const milliseconds = ("00" + date.getMilliseconds()).slice(-3);

  // Return the formatted string
  return {
    formattedDate: `${day}-${month}-${year}`,
    time: `${hours}:${minutes}:${seconds}`
  };
}
// return `${day}-${month}-${year}`;
