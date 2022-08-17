import { TextInput, Text, View, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constansts/styles";

function Input({ label, style, textInputProps }) {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...textInputProps}
        style={[
          styles.input,
          textInputProps?.multiline && styles.inputMultiline,
        ]}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    maxHeight: 200,
    textAlignVertical: "top",
  },
});
