export function formatFilenameToDateString(filename: string): string {
  // Regular expression to capture the MM-DD part from the filename
  const regex = /(\d{2})-(\d{2})/;
  const match = filename.match(regex);

  if(match && match.length === 3) {
    const month = parseInt(match[1], 10); // Extract MM
    const day = parseInt(match[2], 10);   // Extract DD

    // Create a new Date object for the extracted MM and DD
    const date = new Date();
    date.setMonth(month - 1); // `setMonth` is zero-indexed, so subtract 1
    date.setDate(day);

    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  return '';
}
