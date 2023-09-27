import AsyncStorage from '@react-native-async-storage/async-storage';
import Transaction from '../models/Transaction';

const GetTransactionsAsync = async () => {
  try {
    const allKeys: readonly string[] = await AsyncStorage.getAllKeys();
    if (allKeys === null || allKeys.length === 0) {
      return;
    }

    const transactionsFromDb = [];
    for (let i = 0; i < allKeys.length; i++) {
      const tx = await AsyncStorage.getItem(allKeys[i]);
      if (tx === null) {
        throw Error(`Key ${allKeys[i]} was not found.`);
      }

      const txObject = JSON.parse(tx);
      const txTyped: Transaction = Transaction.createFromObject(txObject);
      transactionsFromDb.push(txTyped);
    }

    console.log('Expenses: ', transactionsFromDb);
    return transactionsFromDb;
  } catch (error) {
    console.error('Error:', error);
  }
};

const transactionService = {
  GetTransactionsAsync,
};

export default transactionService;
