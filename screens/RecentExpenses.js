import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useExpenses } from "../store/expenses-count";
import { getDateMinusDates } from "../utils/date";

function RecentExpenses() {
  const { expenses } = useExpenses();
  const recentExpenses = expenses.filter(
    (expense) => expense.date <= getDateMinusDates(new Date(), 7)
  );

  return <ExpensesOutput expenses={recentExpenses} periodName="Last 7 days" />;
}

export default RecentExpenses;
