import {View} from 'react-native';
import React from 'react';
import TransactionInput from '../components/TransactionInput';
import Transaction from '../models/Transaction';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../interfaces';
import transactionService from '../services/TransactionService';

type Props = NativeStackScreenProps<RootStackParamList, 'TransactionAddScreen'>;

const TransactionAddScreen = ({navigation, route}: Props) => {
  const {categories} = route.params;

  const addTransaction = async (
    title: string,
    category: string,
    amount: number,
    date?: Date,
  ) => {
    try {
      const id = transactionService.GetLastId() + 1;
      const newTransaction: Transaction = new Transaction(
        id,
        title,
        category,
        date ?? new Date(),
        amount,
      );

      await transactionService.AddTransactionAsync(newTransaction);

      navigation.navigate('TransactionsScreen');
    } catch (error) {
      console.error('Error storing transaction:', error);
    }
  };

  return (
    <View>
      <TransactionInput
        onAddTransaction={addTransaction}
        categories={categories}
      />
    </View>
  );
};

export default TransactionAddScreen;
