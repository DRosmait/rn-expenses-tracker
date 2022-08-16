import { createContext, useCallback, useContext, useReducer } from "react";

export const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2022-01-25"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.4,
    date: new Date("2022-02-01"),
  },
  {
    id: "e3",
    description: "A banch of bananas",
    amount: 59.99,
    date: new Date("2022-02-19"),
  },
];

const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(expenses, { type, payload }) {
  switch (type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...payload, id }, ...expenses];
    case "DELETE":
      return expenses.filter((expense) => expense.id === payload.id);
    case "UPDATE":
      return expenses.map((expense) =>
        expense.id === payload.id
          ? {
              ...expense,
              ...payload,
            }
          : expense
      );
    default:
      throw new Error("ExpensesReducer: wrong action type");
  }
}

function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = useCallback(
    (payload) => dispatch({ type: "ADD", payload }),
    [dispatch]
  );
  const deleteExpense = useCallback(
    (payload) => dispatch({ type: "DELETE", payload }),
    [dispatch]
  );
  const updateExpense = useCallback(
    (payload) => dispatch({ type: "UPDATE", payload }),
    [dispatch]
  );

  const value = {
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;

export function useExpenses() {
  const context = useContext(ExpensesContext);

  if (context === undefined) {
    throw new Error(
      "ExpensesContextProvider must be a parrent of the component"
    );
  }

  return context;
}
