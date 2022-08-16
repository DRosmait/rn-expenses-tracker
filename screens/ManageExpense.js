import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constansts/styles";
import { useExpenses } from "../store/expenses-count";

function ManageExpenses({ navigation, route }) {
  const { expenses, addExpense, deleteExpense, updateExpense } = useExpenses();
  const editedExpenseId = route.params?.itemId;
  const editedExpense = expenses.find(({ id }) => id === editedExpenseId);
  const [description, setDescription] = useState(
    editedExpense.description ?? ""
  );
  const [amount, setAmount] = useState(editedExpense.amount ?? 0);
  const [date, setDate] = useState(editedExpense.date ?? new Date());
  const isEditing = !!editedExpense;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit expense" : "Add expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    deleteExpense({ id: editedExpense });
    cancelHandler();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    isEditing ? updateExpense({ id: editedExpense }) : cancelHandler();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Edit"}
        </Button>
      </View>

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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
