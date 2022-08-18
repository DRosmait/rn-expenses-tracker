import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import ExpensesForm from "../components/ManageExpense/ExpenseForm";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constansts/styles";
import { useExpenses } from "../store/expenses-count";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";

function ManageExpenses({ navigation, route }) {
  const ctx = useExpenses();
  const editedExpenseId = route.params?.itemId;
  const { expenses } = useExpenses();
  const editedExpense = expenses.find(({ id }) => id === editedExpenseId);
  const isEditing = !!editedExpense;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit expense" : "Add expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    ctx.deleteExpense({ id: editedExpenseId });
    deleteExpense(editedExpenseId);
    cancelHandler();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    if (isEditing) {
      ctx.updateExpense({
        id: editedExpenseId,
        ...expenseData,
      });
      updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      ctx.addExpense({
        id,
        ...expenseData,
      });
    }

    cancelHandler();
  }

  return (
    <View style={styles.container}>
      <ExpensesForm
        expense={editedExpense}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Create"}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
