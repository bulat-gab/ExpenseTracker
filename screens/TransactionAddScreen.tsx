import {View} from 'react-native';
import React from 'react';
import TransactionInput from '../components/TransactionInput';
import Transaction from '../models/Transaction';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../interfaces';

const cats = [
  {label: 'food', value: 'food'},
  {label: 'transport', value: 'transport'},
  {label: 'house', value: 'house'},
  {label: 'household', value: 'household'},
  {label: 'utility', value: 'utility'},
  {label: 'health', value: 'health'},
  {label: 'education', value: 'education'},
  {label: 'vacation', value: 'vacation'},
  {label: 'sport', value: 'sport'},
  {label: 'other', value: 'other'},
];

type Props = NativeStackScreenProps<RootStackParamList, 'TransactionAddScreen'>;

const TransactionAddScreen = ({navigation}: Props) => {
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
      navigation.navigate('TransactionsScreen');
    } catch (error) {
      console.error('Error storing transaction:', error);
    }
  };

  return (
    <View>
      <TransactionInput onAddTransaction={addTransaction} categories={cats} />
    </View>
  );
};

export default TransactionAddScreen;
