import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useExpenses } from "../store/expenses-count";

function AllExpenses() {
  const { expenses } = useExpenses();

  return (
    <ExpensesOutput
      expenses={expenses}
      periodName="Total"
      fallbackText="No expenses registered yet..."
    />
  );
}

export default AllExpenses;
