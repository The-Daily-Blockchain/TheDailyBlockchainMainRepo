function SevenDayQuery() {
  // Get the current date and time
  const currentDate = new Date();

  // Calculate the start date by subtracting 7 days from the current date
  const startDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds
  const startTimestamp = Math.floor(startDate.getTime() / 1000); // Convert milliseconds to seconds

  // Calculate the end date as the current date
  const endTimestamp = Math.floor(currentDate.getTime() / 1000); // Convert milliseconds to seconds

  return { startTime: startTimestamp, endTime: endTimestamp };
}

// Call the function to get the timestamps
export const { startTime, endTime } = SevenDayQuery();

console.log("Start Time:", startTime);
console.log("End Time:", endTime);
