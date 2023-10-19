import AsyncStorage from '@react-native-async-storage/async-storage';
import Transaction from '../models/Transaction';

const transactionsKey = 'transactions';
let totalAmount = -1;
let lastId = -1;
let cachedTransactions: Transaction[] = [];

const GetTransactionsAsync = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(transactionsKey);
    const parsedJson: [] = jsonValue != null ? JSON.parse(jsonValue) : [];

    const transactions: Transaction[] = parsedJson.map(x =>
      Transaction.createFromObject(x),
    );

    console.log('Transactions count: ', transactions.length);

    totalAmount = transactions.length;
    cachedTransactions = transactions;

    if (transactions.length !== 0) {
      lastId = transactions[transactions.length - 1].getId();
    } else {
      lastId = 0;
    }
    return transactions;
  } catch (error) {
    console.log(
      'Error occured while fetching transactions from the db: ',
      error,
    );
    return [];
  }
};

const AddTransactionAsync = async (tx: Transaction) => {
  try {
    cachedTransactions.push(tx);
    const jsonValue = JSON.stringify(cachedTransactions);
    await AsyncStorage.setItem(transactionsKey, jsonValue);
    lastId = lastId + 1;
    console.log('Transaction added, id: ', tx.getId());
  } catch (error) {
    console.log('Error occured while adding a transaction to the db: ', error);
  }
};

const GetTotalAmountAsync = async () => {
  if (totalAmount === -1) {
    await GetTransactionsAsync();
  }

  console.log('Total amount: ', totalAmount);
  return totalAmount;
};

const GetLastId = () => {
  return lastId;
};

const transactionService = {
  GetTransactionsAsync,
  AddTransactionAsync,
  GetTotalAmountAsync,
  GetLastId,
};

export default transactionService;
