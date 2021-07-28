export const unixToWeekday = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);
  const option = { weekday: "long" };
  const weekday = new Intl.DateTimeFormat('en-US', option).format(date);
  return weekday;
}
