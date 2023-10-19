import {View} from 'react-native';
import React from 'react';
import TransactionInput from '../components/TransactionInput';
import Transaction from '../models/Transaction';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../interfaces';

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
      const id = uuid.v4().toString();
      const txDate = date ?? new Date();
      const newTransaction: Transaction = new Transaction(
        id,
        title,
        category,
        txDate,
        amount,
      );

      console.log(newTransaction);

      await AsyncStorage.setItem(id, JSON.stringify(newTransaction));
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
