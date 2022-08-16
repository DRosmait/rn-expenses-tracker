import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useExpenses } from "../store/expenses-count";

function AllExpenses() {
  const { expenses } = useExpenses();

  return <ExpensesOutput expenses={expenses} periodName="Total" />;
}

export default AllExpenses;
