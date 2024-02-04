export function getDayOfWeek(dateString: string): string {
  const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Create a Date object from the input string
  const date: Date = new Date(dateString);

  // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
  const dayOfWeekIndex: number = date.getDay();

  // Get the day of the month
  const dayOfMonth: number = date.getDate();

  // Get the month (0 for January, 1 for February, etc.)
  const monthIndex: number = date.getMonth();

  // Return a string with the day, month, and day of the week
  return `${days[dayOfWeekIndex]}, ${dayOfMonth} ${getMonthName(monthIndex)}`;
}

export function getMonthName(monthIndex: number): string {
  const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[monthIndex];
}


// Example usage:
//const dateString: string = "2024-01-31";
//const dayOfWeek: string = getDayOfWeek(dateString);
//console.log(dayOfWeek); // Output: Wednesday, 31 January

export function removeDot(number: number): number {
  //return number.split('.')[0];
  return Math.trunc(number)
}