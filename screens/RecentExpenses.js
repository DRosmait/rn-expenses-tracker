import { useLayoutEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { useExpenses } from "../store/expenses-count";
import { getDateMinusDates } from "../utils/date";
import { getExpenses } from "../utils/http";

function RecentExpenses() {
  const { expenses, setExpenses } = useExpenses();
  const recentExpenses = expenses.filter(
    (expense) => expense.date >= getDateMinusDates(new Date(), 7)
  );
  const [isFetching, setIsFetching] = useState(false);

  useLayoutEffect(() => {
    setIsFetching(true);
    getExpenses()
      .then(setExpenses)
      .finally(() => setIsFetching(false));
  }, []);

  return isFetching ? (
    <LoadingOverlay />
  ) : (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName="Last 7 days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
}

export default RecentExpenses;
