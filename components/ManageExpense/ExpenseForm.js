import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";

function ExpensesForm() {
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your expense</Text>

      <View style={styles.inputRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          textInputProps={{
            keyboardType: "decimal-pad",
            placeholder: "Amount",
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          textInputProps={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
          }}
        />
      </View>

      <Input
        label="Description"
        textInputProps={{
          placeholder: "Description",
          multiline: true,
        }}
      />
    </View>
  );
}

export default ExpensesForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
  },
  rowInput: {
    flex: 1,
  },
});
