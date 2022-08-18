import { createContext, useCallback, useContext, useReducer } from "react";

const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(expenses, { type, payload }) {
  switch (type) {
    case "ADD":
      return [{ ...payload }, ...expenses];
    case "SET":
      return [...payload.reverse()];
    case "DELETE":
      return expenses.filter((expense) => expense.id !== payload.id);
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
  const [expenses, dispatch] = useReducer(expensesReducer, []);

  const addExpense = useCallback(
    (payload) => dispatch({ type: "ADD", payload }),
    [dispatch]
  );
  const setExpenses = useCallback(
    (payload) => dispatch({ type: "SET", payload }),
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
    setExpenses,
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
