import {View} from 'react-native';
import React from 'react';
import TransactionInput from './TransactionInput';
import Transaction from '../models/Transaction';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionAddScreen = () => {
  const addTransaction = async (
    title: string,
    category: string,
    amount: number,
  ) => {
    try {
      const id = uuid.v4().toString();
      const date = new Date();
      const newTransaction: Transaction = new Transaction(
        id,
        title,
        category,
        date,
        amount,
      );

      console.log(newTransaction);

      await AsyncStorage.setItem(id, JSON.stringify(newTransaction));
    } catch (error) {
      console.error('Error storing transaction:', error);
    }
  };

  return (
    <View>
      <TransactionInput onAddTransaction={addTransaction} />
    </View>
  );
};

export default TransactionAddScreen;
