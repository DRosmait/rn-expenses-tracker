export function getDateMinusDates(date, days) {
  return new Date(date.setDate(-days));
}

export function getFormattedDate(date) {
  return date?.toISOString().slice(0, 10);
}
