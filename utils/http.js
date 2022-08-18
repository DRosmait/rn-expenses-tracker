import axios from "axios";
import { Alert } from "react-native";

export async function storeExpense(expenseData) {
  try {
    const { data } = await axios.post(
      `${process.env.FIREBASE_BASE_URL}/expenses.json`,
      expenseData
    );
    return data.name;
  } catch (err) {
    Alert.alert("Error occurred", "Can not fetch expenses");
  }
}

export async function getExpenses() {
  try {
    const response = await axios.get(
      `${process.env.FIREBASE_BASE_URL}/expenses.json`
    );

    return Object.entries(response.data).map(
      ([id, { date, ...expenseRestData }]) => ({
        ...expenseRestData,
        id,
        date: new Date(date),
      })
    );
  } catch (err) {
    Alert.alert("Error occurred", "Can not fetch expenses");
  }
}
