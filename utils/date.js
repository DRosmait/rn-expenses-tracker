export function getDateMinusDates(date, days) {
  return new Date(date.setDate(-days));
}
