import AsyncStorage from '@react-native-async-storage/async-storage';
import Transaction from '../models/Transaction';

let totalAmount: Number = -1;

const GetTransactionsAsync = async () => {
  try {
    const allKeys: readonly string[] = await AsyncStorage.getAllKeys();
    if (allKeys === null || allKeys.length === 0) {
      totalAmount = 0;
      return [];
    }

    const transactionsFromDb = [];
    let totalAmountTemp = 0;

    for (let i = 0; i < allKeys.length; i++) {
      const tx = await AsyncStorage.getItem(allKeys[i]);
      if (tx === null) {
        throw Error(`Key ${allKeys[i]} was not found.`);
      }

      const txObject = JSON.parse(tx);
      const txTyped: Transaction = Transaction.createFromObject(txObject);
      transactionsFromDb.push(txTyped);
      totalAmountTemp += txTyped.getAmount();
    }

    console.log('Expenses: ', transactionsFromDb);
    totalAmount = totalAmountTemp;
    return transactionsFromDb;
  } catch (error) {
    console.error('Error:', error);
    totalAmount = 0;
    return [];
  }
};

const GetTotalAmountAsync = async () => {
  if (totalAmount !== -1) {
    return totalAmount;
  }

  await GetTransactionsAsync();
  console.log('Total amount: ', totalAmount);
  return totalAmount;
};

const transactionService = {
  GetTransactionsAsync,
  GetTotalAmountAsync,
};

export default transactionService;
