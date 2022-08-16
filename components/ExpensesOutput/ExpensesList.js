import { FlatList, StyleSheet, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

function ExpesesList({ expenses, onPressed }) {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => (
        <ExpenseItem
          description={item.description}
          date={item.date}
          amount={item.amount}
          onPressed={() => onPressed?.(item.id)}
        />
      )}
      keyExtractor={({ id }) => id}
    />
  );
}

export default ExpesesList;

const styles = StyleSheet.create({});
