import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constansts/styles";
import { useNavigation } from "@react-navigation/native";

function ExpensesOutput({ expenses, periodName, fallbackText }) {
  const { navigate } = useNavigation();

  function expenseItemPressHandler(itemId) {
    navigate("ManageExpense", { itemId });
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      {expenses.length ? (
        <ExpensesList expenses={expenses} onPressed={expenseItemPressHandler} />
      ) : (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{fallbackText}</Text>
        </View>
      )}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    color: GlobalStyles.colors.primary100,
    fontSize: 16,
  },
});
