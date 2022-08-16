import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constansts/styles";
import { useNavigation } from "@react-navigation/native";

function ExpensesOutput({ expenses, periodName }) {
  const { navigate } = useNavigation();

  function expenseItemPressHandler(itemId) {
    navigate("ManageExpense", { itemId });
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      <ExpensesList expenses={expenses} onPressed={expenseItemPressHandler} />
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
});
