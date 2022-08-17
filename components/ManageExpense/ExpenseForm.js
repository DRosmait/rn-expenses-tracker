import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../utils/date";

function ExpensesForm({ expense, onCancel, onSubmit, submitButtonLabel }) {
  const [inputValues, setInputValues] = useState({
    amount: expense?.amount.toFixed(2) ?? "",
    description: expense?.description ?? "",
    date: getFormattedDate(expense?.date) ?? "",
  });

  function inputChangedHandler(inputIdentifier, value) {
    setInputValues((currentInputValues) => ({
      ...currentInputValues,
      [inputIdentifier]: value,
    }));
  }

  function submitHandler() {
    onSubmit({
      description: inputValues.description,
      amount: +parseFloat(inputValues.amount).toFixed(2),
      date: new Date(inputValues.date),
    });
  }

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
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          textInputProps={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputValues.date,
          }}
        />
      </View>

      <Input
        label="Description"
        textInputProps={{
          placeholder: "Description",
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValues.description,
        }}
      />

      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
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
